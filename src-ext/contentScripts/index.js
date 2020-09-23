import './index.styl'

console.log('Content script working...')

var port = chrome.runtime.connect()

window.addEventListener(
  'message',
  function (event) {
    // We only accept messages from ourselves
    if (event.source != window) return

    if (event.data.type && event.data.type == 'SUBMIT_DOMAINS') {
      console.log('Content script received: ' + event.data.type)
      port.sendMessage(event.data)
    }
  },
  false
)
