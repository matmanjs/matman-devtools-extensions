console.log('--hello--content-script.js', window.jQuery);

// 加载完 jQuery 之后，可以做一些其他的事情
$(document).ready(function () {
    var size = window.jQuery('div').length;
    console.log('--hello--content-script.js 222222', size);

    // setTimeout(() => {
    //     chrome.runtime.sendMessage({ msg: '试试主动从 content-script.js 能否发送信息' });
    // }, 5000);
});

// 监听来自 DevTools page 的消息，然后再回调信息
// 例如可获取到 DOM 或 window 的信息，再传回到 DevTools page 做展示
// DevTools page 通过 chrome.tabs.sendMessage 来发送消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('--onMessage in content-script.js--', message);
    sendResponse({
        ccc: 'response from content-script.js for ' + message
    });
});

function setSelectedElement(el) {
    // do something with the selected element

    console.log('--setSelectedElement5--', el, { j: window.jQuery });
}

// 监听 message 事件，最后再将消息透传到 DevTools，
// 使用场景：Injected Scripts 调用 window.postMessage({}, '*'); 然后在这里接收到数据
// Messaging from Injected Scripts to the DevTools Page
// https://developer.chrome.com/extensions/devtools#evaluated-scripts-to-devtools
window.addEventListener('message', function (event) {
    console.log('------window.addEventListener message------', event, event.data);
    // Only accept messages from the same frame
    if (event.source !== window) {
        return;
    }

    var message = event.data;

    // Only accept messages that we know are ours
    if (typeof message !== 'object' || message === null ||
        !message.source === 'my-devtools-extension') {
        return;
    }

    chrome.runtime.sendMessage({
        type: 'content-script.js sendMessage',
        message: message
    });
});


