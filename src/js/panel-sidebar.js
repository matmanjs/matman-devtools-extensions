// // Create a connection to the background page
// var backgroundPageConnection = chrome.runtime.connect({
//     name: 'panel'
// });
//
// const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;
//
// // backgroundPageConnection.postMessage({
// //     name: 'init',
// //     tabId: inspectedWindowId
// // });
//
// // Listen to messages from the background page
// backgroundPageConnection.onMessage.addListener(function (message) {
//     console.log('[panel-sidbar.js] ------backgroundPageConnection.onMessage-----', message);
//
//     if (message.updatedTabId === inspectedWindowId) {
//         console.log('[panel-sidbar.js] ------curent inspected window-----');
//     }
// });

var app = new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: '',
        tips: 'init tips'
    },
    methods: {
        handleClick: function (event) {
            this.tips = 'loading...';

            // 发送消息给 content script，并处理回调
            sendMsgToContentScript({
                type: 'GET_NEW_TIPS'
            }, (response) => {
                this.tips = response;
            });
        }
    },
    created() {
        // 监听来自 content script 的消息，并处理回调
        listenMsgFromContentScript((message) => {
            this.showData = JSON.stringify(message);
        });
    }
});

/**
 * 发送消息给 content script，并处理回调
 *
 * @param {Object} message 消息
 * @param {Function} callback
 */
function sendMsgToContentScript(message, callback) {
    // https://developer.chrome.com/extensions/devtools#content-script-to-devtools
    // https://developer.chrome.com/extensions/tabs#method-sendMessage
    chrome.tabs.sendMessage(chrome.devtools.inspectedWindow.tabId, message, function (response) {
        console.log('[panel-sidbar.js][sendMsgToContentScript] receive response', response);

        callback(response);
    });
}

/**
 * 监听来自 content script 的消息，并处理回调
 *
 * @param {Function} callback
 */
function listenMsgFromContentScript(callback) {
    // https://developer.chrome.com/extensions/runtime#event-onMessage
    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log('[panel-sidbar.js][listenMsgFromContentScript] receive message', message);

        callback(message);
    });
}