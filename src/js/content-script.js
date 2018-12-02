console.log('[matman-devtools] content scripts loaded');

/**
 * 消息类型
 * @type {Object}
 */
const MATMAN_DEVTOOLS_MESSAGE_TYPE = {
    SEND_RESPONSE_GET_TIPS: 'CONTENT_SCRIPT_SEND_RESPONSE_GET_TIPS',
    SEND_MESSAGE_AFTER_SELECTED_ELEMENT: 'CONTENT_SCRIPT_SEND_MESSAGE_AFTER_SELECTED_ELEMENT'
};

let matmanDevtoolsSelectedDom;

/**
 * 设置当前选中的元素，由 DevTools 传递过来
 * @param selectedDom 当前选中的 DOM 元素
 */
function setSelectedElement(selectedDom) {
    console.log('[matman-devtools] selected dom', selectedDom);
    matmanDevtoolsSelectedDom = selectedDom;

    // 获取相关数据
    const data = {
        className: selectedDom.getAttribute('class'),
        text: selectedDom.innerHTML,
        hasJquery: !!window.jQuery,
        pageTitle: document.title,
        _webviewloaded: window._webviewloaded
    };

    // 传递数据到 DevTools page
    chrome.runtime.sendMessage({
        type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_MESSAGE_AFTER_SELECTED_ELEMENT,
        data: data
    });
}

// 加载完 jQuery 之后，可以做一些其他的事情
$(document).ready(function () {
    console.log('[matman-devtools] jQuery is ready!');
});

// 监听来自 DevTools page 的消息，然后再回调信息
// 例如可获取到 DOM 或 window 等信息，再传回到 DevTools page 做展示
// DevTools page 通过 chrome.tabs.sendMessage 来发送消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('[matman-devtools] receive message', message);

    // 如果当前没有已选中的 dom ，则不做其他处理
    if (!matmanDevtoolsSelectedDom) {
        sendResponse({
            type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_RESPONSE_GET_TIPS,
            data: {
                error: 'selected dom is undefined!'
            }
        });

        return;
    }

    let selectedDom = matmanDevtoolsSelectedDom;

    // 接收到新的指令，获取到 DOM 或 window 的信息
    let data = {
        className: selectedDom.getAttribute('class'),
        text: selectedDom.innerHTML
    };

    // 传回到 DevTools page
    sendResponse({
        type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_RESPONSE_GET_TIPS,
        data: data
    });
});

// 监听 message 事件，最后再将消息透传到 DevTools，
// 使用场景：Injected Scripts 调用 window.postMessage({}, '*'); 然后在这里接收到数据
// Messaging from Injected Scripts to the DevTools Page
// https://developer.chrome.com/extensions/devtools#evaluated-scripts-to-devtools
// window.addEventListener('message', function (event) {
//     console.log('------window.addEventListener message------', event, event.data);
//     // Only accept messages from the same frame
//     if (event.source !== window) {
//         return;
//     }
//
//     var message = event.data;
//
//     // Only accept messages that we know are ours
//     if (typeof message !== 'object' || message === null ||
//         !message.source === 'my-devtools-extension') {
//         return;
//     }
//
//     chrome.runtime.sendMessage({
//         type: 'content-script.js sendMessage',
//         message: message
//     });
// });



