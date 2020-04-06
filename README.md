# myLS History Scraper

This tool must be installed as a Google Chrome extension
It presents the user with a display to select from pre-defined URLs
Upon submission the user's history is scanned for the selected URLS, and the results posted to the server

# Configuration

Update the server address before building in these two files: 
  * src/background/index.js
  * src/popup/App.vue

# Build and run

1. `yarn`
2. Run `yarn run build`
3. Go to URL: `chrome://extensions/`
4. Set Chrome extensions to developer mode
5. Use 'load Unpacked' to select the /dist folder
6. Run server `node server/server_myls.js`
