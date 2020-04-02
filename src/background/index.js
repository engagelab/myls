function scrapeDomains(domains) {
  // For each domain in data, search history for all entries matching
  // Post the result to an API at engagelab
  let totalFound = 0;
  const searchItems = []
  const resultItems = []
  domains.forEach(group => {
    group.urls.forEach(urlItem => {
      if (urlItem.checked) {
        const ui = { ...urlItem }
        delete ui.checked
        delete ui.id
        searchItems.push(ui) 
      }
    })
  })

  const postResults = () => {
    const xhr = new XMLHttpRequest();
    const headers = {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    }
    // Event listener must be added before calling open()
    xhr.addEventListener('loadend', () =>
    {
      const data = xhr.response;
      console.log(data)
    })

    xhr.open('POST', 'https://localhost:8080/api/result');
    xhr.responseType = 'json';
    xhr.withCredentials = false;
    const headerKeys = Object.keys(headers)
    headerKeys.forEach(k => xhr.setRequestHeader(k, headers[k]));
    try {
      xhr.send(JSON.stringify(resultItems));
    } catch(error) {
      console.log(error)
    }
  }

  const searchForItem = (urlItem) => {
    const ui = urlItem
    chrome.history.search({
      text: ui.title,
      startTime: 0  // that was accessed since this time - ms since the epoch
    },
    historyItems => {
      ui.visitData.count = historyItems.length
      totalFound += historyItems.length
      resultItems.push(ui)
      if (searchItems.length > 0) {
        searchForItem(searchItems.pop())
      } else {
        console.log(`Total found: ${totalFound}`)
        postResults()
      }
    });
  }
  if (searchItems.length > 0) {
    searchForItem(searchItems.pop())
  }
}

// OnInstall handler
chrome.runtime.onInstalled.addListener(details => {
  console.log(details)
})

chrome.runtime.onMessage.addListener(
  function(data) {
    console.log(`Content script received a message: ${data.type}`);
    if (data.type === 'SUBMIT_DOMAINS') {
      scrapeDomains(data.domains)
    }
});
