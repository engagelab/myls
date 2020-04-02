# myLS History Scraper

This tool must be installed as a Google Chrome extension
It presents the user with a display to select from pre-defined URLs
Upon submission the user's history is scanned for the selected URLS, and the results posted to the server

# Build and run

* Run `npm run build`
* Go to URL: `chrome://extensions/`
* Set Chrome extensions to developer mode
* Use 'load Unpacked' to select the /dist folder
* Run server `node server/server_myls.js`
