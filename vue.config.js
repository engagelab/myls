const fs = require('fs')
const useSSL = process.env.VUE_APP_USE_SSL == 'true'
const protocol = useSSL ? 'https' : 'http'
const host = process.env.VUE_APP_SERVER_HOST
const port = process.env.VUE_APP_SERVER_PORT
const hotHost = process.env.VUE_APP_HOTRELOAD_SERVER_HOST
const hotPort = process.env.VUE_APP_HOTRELOAD_SERVER_PORT

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/myls/' : '/',
  outputDir: './www',
  assetsDir: 'assets',
  configureWebpack: config => {
    config.entry = './src-www/main.js'
  },
  devServer: {
    https: useSSL
      ? {
        key: fs.readFileSync(process.env.SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.SSL_CERT_FILE)
          // ca: fs.readFileSync('/path/to/ca.pem'),
      }
      : false,
    index: 'index.html',
    // host: host == 'localhost' ? undefined : host,
    host: hotHost,
    port: hotPort,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '/api': {
        target: `${protocol}://${host}:${port}`,
        changeOrigin: true
      },
      '/auth': {
        target: `${protocol}://${host}:${port}`,
        changeOrigin: true
      }
    }
  }
}
