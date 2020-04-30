/*
 Designed and developed by Richard Nesnass and Sharanya Manivasagam
*/

require('dotenv').config({ silent: process.env.NODE_ENV !== 'development' })
const path = require('path')
const express = require('express')
const apiRoutes = require('./routing/api')
const db = require('./database')

const app = express()
app.locals.pretty = true

db.connect('MyLS Sever')
app.use('/', express.static(path.join(__dirname, '../www')))
// Can remove this after testing is over. Since we will not encounter CORS issues if the server is serving the webpage
// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.use((req, res, next) => {
  const allowedOrigins = ['*', 'https://192.168.1.11:8090']
  const { origin } = req.headers
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  // res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', true)
  return next()
})

app.use(express.json())

// If running in production mode, start a secure server
if (
  process.env.NODE_ENV === 'production' ||
  process.env.VUE_APP_USE_SSL === 'true'
) {
  // Redirect http calls to https when running in production mode
  app.use((req, res, next) => {
    if (!req.secure) {
      const redirect = `https://${req.headers.host}${req.url}`
      return res.redirect(redirect)
    }
    return next()
  })
}

// Send the whole build folder to the user or anyone connected to the server

app.use('/api', apiRoutes)

module.exports = app
