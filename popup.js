// This function is injected into the page to find the buildId from the __NEXT_DATA__ script tag.
function findBuildIdOnPage() {
    const nextDataScript = document.getElementById('__NEXT_DATA__');
    if (nextDataScript && nextDataScript.textContent) {
        try {
            const data = JSON.parse(nextDataScript.textContent);
            return data.buildId;
        } catch (e) {
            // JSON parsing failed
            return null;
        }
    }
    return null;
}


// Add a listener for when the popup's DOM is fully loaded.
document.addEventListener('DOMContentLoaded', () => {
    const findBtn = document.getElementById('findBtn');
    const resultDiv = document.getElementById('result');

    // Add a click event listener to the button.
    findBtn.addEventListener('click', () => {
        // Use the chrome.tabs API to get the current active tab.
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];

            // Ensure we have a valid tab with a URL and ID.
            if (!tab || !tab.url || !tab.id) {
                resultDiv.textContent = 'Error: Could not get active tab details.';
                return;
            }
            
            // Make sure the URL is http or https for network requests.
            if (!tab.url.startsWith('http')) {
                resultDiv.textContent = 'Error: This extension only works on http/https websites.';
                return;
            }

            const url = new URL(tab.url);
            const buildIdUrl = `${url.origin}/_next/BUILD_ID`;

            resultDiv.textContent = 'Searching (Method 1: Direct fetch)...';

            // --- Method 1: Fetch the BUILD_ID file directly. ---
            fetch(buildIdUrl)
                .then(response => {
                    if (!response.ok) {
                        // If the file isn't found, throw an error to trigger the fallback.
                        throw new Error('File not found. Trying Method 2...');
                    }
                    return response.text();
                })
                .then(buildId => {
                    // Success! Display the build ID.
                    resultDiv.textContent = buildId.trim();
                })
                .catch(error => {
                    // --- Method 2: Fallback to injecting a script. ---
                    resultDiv.textContent = `Info: ${error.message}`;
                    
                    chrome.scripting.executeScript({
                        target: { tabId: tab.id },
                        function: findBuildIdOnPage
                    }, (injectionResults) => {
                        if (chrome.runtime.lastError) {
                            // Handle potential errors from scripting execution.
                            resultDiv.textContent = `Error: ${chrome.runtime.lastError.message}`;
                            return;
                        }

                        // Check the results from the injected script.
                        if (injectionResults && injectionResults[0] && injectionResults[0].result) {
                            resultDiv.textContent = injectionResults[0].result;
                        } else {
                            resultDiv.textContent = 'Build ID not found on this page.';
                        }
                    });
                });
        });
    });
});
