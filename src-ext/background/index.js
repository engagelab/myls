const resultRoute = process.env.VUE_APP_RESULT_ROUTE
const installedRoute = process.env.VUE_APP_INSTALLED_ROUTE
const serverURL = process.env.VUE_APP_FULL_SERVER

// data should be in JSON String format
function sendToServer (requestType, data, route, callback) {
  const xhr = new XMLHttpRequest()
  const headers = {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  }
  // Event listener must be added before calling open()
  xhr.addEventListener('loadend', () => {
    const xhrdata = xhr.response
    callback({ xhrdata, success: true })
  })
  xhr.open(requestType, `${serverURL}${route}`)
  xhr.responseType = 'json'
  xhr.withCredentials = false
  const headerKeys = Object.keys(headers)
  headerKeys.forEach(k => xhr.setRequestHeader(k, headers[k]))
  xhr.send(data)
}

function notifyInstallStatus (data, callback) {
  const d = JSON.stringify(data)
  sendToServer('POST', d, installedRoute, response => {
    if (data.mode == 'uninstalled') {
      chrome.management.uninstallSelf()
    }
    callback(response)
  })
}

function scrapeDomains (data, callback) {
  // For each domain in data, search history for all entries matching
  // Post the result to an API at engagelab
  let totalFound = 0
  const searchItems = [...data.urls]
  const resultItems = []

  // For each URL, do a history search
  const searchForItem = urlItem => {
    const ui = urlItem

    const nextItem = () => {
      resultItems.push(ui)
      if (searchItems.length > 0) {
        searchForItem(searchItems.pop())
      } else {
        console.log(`Total found: ${totalFound}`)
        try {
          const JSONString = JSON.stringify({
            items: resultItems,
            email: data.email,
            id: data.id,
            consented: data.consented,
            lottery: data.lottery,
            other: data.other
          })
          sendToServer('POST', JSONString, resultRoute, response =>
            callback(response)
          )
        } catch (error) {
          console.log(error)
        }
      }
    }

    chrome.history.search(
      {
        text: ui.search,
        maxResults: 10000,
        startTime: 0, // that was accessed since this time - ms since the epoch
        endTime: Date.now() - 3600000 // Exclude the latest hour
      },
      historyItems => {
        const l = historyItems.length
        // For each history item, discover more about the visits to it
        ui.historyItems = historyItems
        totalFound += l
        if (l > 0) {
          historyItems.forEach((hi, index) => {
            chrome.history.getVisits({ url: hi.url }, function (visitItems) {
              hi.visitItems = visitItems
              // Title and URL values can possibly contain private information
              // We delete them here before sending the data
              delete hi.title
              delete hi.url
              if (index === historyItems.length - 1) {
                nextItem()
              }
            })
          })
        } else {
          nextItem()
        }
      }
    )
  }

  if (searchItems.length > 0) {
    searchForItem(searchItems.pop())
  } else {
    callback({ success: true })
  }
}

// OnInstall handler
/* chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
}) */

chrome.runtime.onMessageExternal.addListener(function (
  request,
  sender,
  callback
) {
  console.log(request.type)
  if (request.type == 'HELLO') {
    callback({ success: true })
  } else if (request.type == 'SUBMIT') {
    scrapeDomains(request.data, callback)
  } else if (request.type == 'INSTALLSTATUS') {
    notifyInstallStatus(request.data, callback)
  }
})
