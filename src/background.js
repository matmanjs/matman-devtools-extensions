chrome.runtime.onConnect.addListener(function (port) {
    chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
        if (changeInfo.status === 'complete') {
            reloadExtension(port, tabId);
        }
    });
    function reloadExtension(port, tabId) {
        const message = { action: "reloadExtension", updatedTabId: tabId };
        port.postMessage(message);
    }
});
// `background.js` 透過 `chrome.runtime.onConnect.addListener`
// 在與 devtools page 的 script 連接到後，監聽 `chrome.tabs.onUpdated` 事件，
// 當 update status 為 complete 後，`postMessage()` 給 `Panel.html` 中的 `getPageTitle.js`。
