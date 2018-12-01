console.log('--hello--content-script4.js', window.jQuery);

chrome.runtime.sendMessage({ zzzzzz: 'xxxxxxx', result: 222 }, function (response) {
    console.log('--xxxxxx ontent-script--', response);
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('--onMessage content-script--', request);
        sendResponse('收到了！')
    });
