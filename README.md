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

# Build extension for Chrome Store

*** Remember to change .env vars VUE_APP_FULL_SERVER and VUE_APP_EXTENSION_ID !!
*** Also remove local testing urls from manifest.json

# Spec 4/2020

The survey has four sections, one for each group of activity (solving problems, stay up to date, deliberate learning, career management). Each section has this structure (of course with a longer and better explanaition and more activities):

Section 1: Task A

I) Select all the activities you have performed for the task A:
a) Activity 1 [Yes/No]
b) Activity 2 [Yes/No]

II.a) [if I.a = Yes] Activity 1. Select the websites/platforms you use when carrying out this activity, who you use it with and the time you dedicate to this activity whitin that website/platform (grid like question):

a) Website 1 [Yes/No] | other students [Yes/No]| developer community [Yes/No]| expert developers [Yes/No] | [1-25%; 25%-50%; 50-75%; 100%]
b) Website 2 [Yes/No] | other students [Yes/No]| developer community [Yes/No]| expert developers [Yes/No] ​| [1-25%; 25%-50%; 50-75%; 100%]

II.b) [if I.b = Yes] Activity 2. Select the websites/platforms you use when carrying out this activity, who you use it with and the time you dedicate to this activity whitin that website/platform (grid like question):

a) Website 1 [Yes/No] | other students [Yes/No]| developer community [Yes/No]| expert developers [Yes/No] | [1-25%; 25%-50%; 50-75%; 100%]
b) Website 2 [Yes/No] | other students [Yes/No]| developer community [Yes/No]| expert developers [Yes/No] ​| [1-25%; 25%-50%; 50-75%; 100%]

That is how one section should work, but then it moves towards a second section with other group of activities and websites to select.

I hope this clarifies how the logic works. The websites will be predefined, although it could also be a good idea for the student to be able to include more websites by themselves. I also consider the possibility of leaving a open question for the student to write down if they do other activity not considered in the list to do the group of activity at the end of each section as a separate question. So regarding the groups you asked before, yes the websites will be divided in groups as part of the logic, but I wonder if it is possible to make it so they move forward in the questionnaire in different sections rather than haing everything together in the same window, especially considering that questions are conditional to the activities they perform.
