console.log('--hello--content-script.js', window.jQuery);

$(document).ready(function () {
    var size = window.jQuery('div').length;
    console.log('--hello--content-script.js 222222', size);

    // const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;
    //
    // // https://developer.chrome.com/extensions/tabs#method-sendMessage
    // chrome.tabs.sendMessage(inspectedWindowId, { zzzzzzzz: size }, function (response) {
    //     console.log('--chrome.tabs.sendMessage from content-script.js--', response);
    // });
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('--onMessage in content-script.js--', message);
    sendResponse({
        ccc: 'response from content-script.js for ' + message
    });
});