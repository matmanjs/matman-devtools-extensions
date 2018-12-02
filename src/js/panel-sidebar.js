// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: 'panel'
});

const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;

// backgroundPageConnection.postMessage({
//     name: 'init',
//     tabId: inspectedWindowId
// });

// Listen to messages from the background page
backgroundPageConnection.onMessage.addListener(function (message) {
    console.log('[panel-sidbar.js] ------backgroundPageConnection.onMessage-----', message);

    if (message.updatedTabId === inspectedWindowId) {
        console.log('[panel-sidbar.js] ------curent inspected window-----');
    }
});

new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: ''
    },
    created() {
        console.log('[panel-sidbar.js] --created--');
        const self = this;

        // https://developer.chrome.com/extensions/runtime#event-onMessage
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('[panel-sidbar.js] --chrome.runtime.onMessage--', message);

            sendResponse({
                farewell: 'i got your message, and say ' + message && message.result && message.result.text
            });

            self.showData = JSON.stringify(message);
        });
    }
});

function sendMsgToContentScript(message) {
    const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;

    // https://developer.chrome.com/extensions/devtools#content-script-to-devtools
    // https://developer.chrome.com/extensions/tabs#method-sendMessage
    chrome.tabs.sendMessage(inspectedWindowId, {
        text: message.result && message.result.text || 'unknown'
    }, function (response) {
        console.log('[panel-sidbar.js] --chrome.tabs.sendMessage from content scripts--', response);
    });
}
