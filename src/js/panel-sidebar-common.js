const gMockData = {
    data1: {
        hellow: 'world'
    }
};

const gUtils = (function () {
    /**
     * 发送消息给 content script，并处理回调
     *
     * @param {Object} message 消息
     * @param {Function} callback
     */
    function sendMsgToContentScript(message, callback) {
        // 这里主要是为了调试之用
        if ((typeof chrome === 'undefined') || !chrome.tabs || !chrome.tabs.sendMessage) {
            callback({
                type: 'SEND_RESPONSE_GET_TIPS',
                data: gMockData.data1
            });
            return;
        }

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
        // 这里主要是为了调试之用
        if ((typeof chrome === 'undefined') || !chrome.runtime || !chrome.runtime.onMessage) {
            callback({
                type: 'CONTENT_SCRIPT_SEND_MESSAGE_AFTER_SELECTED_ELEMENT',
                data: gMockData.data1
            });
            return;
        }

        // https://developer.chrome.com/extensions/runtime#event-onMessage
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('[panel-sidbar.js][listenMsgFromContentScript] receive message', message);

            callback(message);
        });
    }

    return {
        sendMsgToContentScript,
        listenMsgFromContentScript
    };
})();
