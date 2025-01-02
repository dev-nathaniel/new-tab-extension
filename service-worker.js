// chrome.action.onClicked.addListener(tab => {
//     chrome.scripting.executeScript({
//         target: {tabId: tab.id},
//         func: () => {
//             alert('Hello from my extension!')
//         }
//     })
// })

chrome.runtime.onInstalled.addListener(() => {
    chrome.scripting.registerContentScripts([
      {
        id: "modifyAnchorTargets",
        matches: ["<all_urls>"],
        js: ["content.js"],
        runAt: "document_idle"
      }
    ]);
  });

  
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "local" && changes.isEnabled) {
        const isEnabled = changes.isEnabled.newValue;

        //reload the content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    files: ["content.js"]
                })
            }
        })
    }
})