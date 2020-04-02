/*
 Designed and developed by Richard Nesnass and Sharanya Manivasagam
*/
const https = require('https');
const fs = require('fs');
const app = require('./app');
const packageVersion = require('../package.json').version;

const port = process.env.VUE_APP_SERVER_PORT
const host = process.env.VUE_APP_SERVER_HOST
const protocol = process.env.VUE_APP_USE_SSL === 'true' ? 'https' : 'http'
const version = `myLS v${packageVersion}`;

function startServerCallback() {
  console.log(version)
  console.log(`Your server is listening at ${protocol}://${host}:${port}`)

}

// Activate HTTPS server or HTTP server if running locally
if (
  process.env.VUE_APP_USE_SSL === 'true' ||
  process.env.NODE_ENV === 'production'
) {
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_FILE),
    cert: fs.readFileSync(process.env.SSL_CERT_FILE)
  }
  console.log('Using SSL')
  https.createServer(sslOptions, app).listen(port, startServerCallback)
} else {
  app.listen(port, startServerCallback)
}
