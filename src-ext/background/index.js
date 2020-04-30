const port = process.env.VUE_APP_SERVER_PORT
const host = process.env.VUE_APP_SERVER_HOST
const protocol = process.env.VUE_APP_USE_SSL === 'true' ? 'https' : 'http'
const resultRoute = process.env.VUE_APP_RESULT_ROUTE
const serverURL = `${protocol}://${host}:${port}`

function scrapeDomains (data, sendResponse) {
  // For each domain in data, search history for all entries matching
  // Post the result to an API at engagelab
  let totalFound = 0
  const searchItems = [...data]
  const resultItems = []

  const postResults = () => {
    const xhr = new XMLHttpRequest()
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    // Event listener must be added before calling open()
    xhr.addEventListener('loadend', () => {
      const data = xhr.response
      console.log(data)
      sendResponse({ success: true })
    })
    xhr.open('POST', `${serverURL}${resultRoute}`)
    // xhr.open('POST', 'https://engagelab.uio.no/myls/api/result')
    xhr.responseType = 'json'
    xhr.withCredentials = false
    const headerKeys = Object.keys(headers)
    headerKeys.forEach(k => xhr.setRequestHeader(k, headers[k]))
    try {
      xhr.send(JSON.stringify(resultItems))
    } catch (error) {
      console.log(error)
    }
  }

  const searchForItem = urlItem => {
    const ui = urlItem
    chrome.history.search(
      {
        text: ui.title,
        maxResults: 10000,
        startTime: 0 // that was accessed since this time - ms since the epoch
      },
      historyItems => {
        ui.visitData = { count: historyItems.length }
        totalFound += historyItems.length
        resultItems.push(ui)
        if (searchItems.length > 0) {
          searchForItem(searchItems.pop())
        } else {
          console.log(`Total found: ${totalFound}`)
          postResults()
        }
      }
    )
  }
  if (searchItems.length > 0) {
    searchForItem(searchItems.pop())
  }
}

// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})
/*
chrome.runtime.onMessage.addListener(function callback (data) {
  console.log(`Background script received a message: ${data.type}`)
  if (data.type === 'SUBMIT_DOMAINS') {
    scrapeDomains(data.submission)
  }
}) */

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log(request.type)
  if (request.type == 'HELLO') {
    sendResponse({ success: true })
  } else if (request.type == 'SUBMIT') {
    scrapeDomains(request.data, sendResponse)
  }
})
