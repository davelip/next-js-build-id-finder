# Next.js Build ID Finder

A simple and lightweight Chrome extension to quickly find the `buildId` of a website built with Next.js.

Release: 1.0 (Wed, 16 Jul 2025 09:40:03 GMT)

## What it does

This extension adds a small icon to your Chrome toolbar. When you're on a Next.js-powered website, you can click the icon, press the "Find Build ID" button, and the extension will instantly retrieve and display the site's unique build identifier.

This is a useful tool for developers, QA testers, and anyone who needs to quickly identify a specific version of a Next.js application running in production.

## Features

-   **One-Click Operation:** Simple and intuitive interface.
-   **Two-Step Detection:**
    1.  First, it attempts a fast, direct fetch of the `/_next/BUILD_ID` file.
    2.  If that fails, it automatically falls back to scanning the page's HTML for the build ID.
-   **Clear Feedback:** The popup provides status messages during the search process.
-   **Lightweight and Fast:** No unnecessary permissions or background processes.

## Installation (from source)

To install and test this extension locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```
2.  **Navigate to the directory:**
    ```bash
    cd your-repo-name
    ```
3.  **Open Chrome Extensions:**
    Open your Chrome browser and navigate to `chrome://extensions`.
4.  **Enable Developer Mode:**
    Turn on the "Developer mode" toggle in the top-right corner.
5.  **Load Unpacked:**
    Click the "Load unpacked" button and select the directory where you cloned the repository.

The extension icon should now appear in your Chrome toolbar.

## How to Use

1.  Navigate to any website built with Next.js (e.g., `https://www.lamborghini.com/`).
2.  Click the extension's icon in the toolbar to open the popup.
3.  Click the **"Find Build ID"** button.
4.  The build ID will appear in the result box.

## Technology Stack

-   HTML5
-   CSS3
-   Plain JavaScript (ES6+)
-   Chrome Extension Manifest V3 APIs (`tabs`, `scripting`)

## Contributing

Contributions are welcome! If you have ideas for improvements or find a bug, feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## Privacy

See the [Privacy](PRIVACY.md) file for details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
