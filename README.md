# FoodBridge — Node.js Server (No Database)

FoodBridge is a responsive food-waste-management front-end served by a small Node.js HTTP server. The existing UI is retained, and a `script.js` file provides the page interactions.

## Requirements
- Node.js 18 or newer

## Run locally
1. Extract this ZIP.
2. Open a terminal in the `foodbridge_nodejs` folder.
3. Run `npm start`.
4. Open `http://localhost:3000` in your browser.

You can change the port by setting the `PORT` environment variable.

## Included files
- `index.html` — website UI
- `style.css` — responsive styling
- `script.js` — donation form, search/filter, mobile menu, and pickup-request demo interactions
- `server.js` — Node.js static-file server
- `package.json` — start script and project metadata

## Important: no database
This project has no database connection and no API/database persistence. Donation listings added through the form are shown only in the current browser page/session. They disappear when the page is refreshed. Pickup requests are demo notifications only.

## Hosting
This is ready to run on a Node.js hosting service that supports `npm start`. Set the start command to `npm start`; the host should provide its own `PORT` environment variable. This ZIP prepares the project but does not publish it to a public hosting account.
