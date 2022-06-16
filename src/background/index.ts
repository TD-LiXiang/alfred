chrome.runtime.onInstalled.addListener(() => {
  console.log('Installed')
})

chrome.runtime.onConnect.addListener(() => {
  console.log('Connected')
})
