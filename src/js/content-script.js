console.log('--hello--content-script.js', window.jQuery);



$(document).ready(function(){
    var size = window.jQuery('div').length
    console.log('--hello--content-script.js 222222',size);

    chrome.runtime.sendMessage({ zzzzzz: 'xxxxxxx', result: size }, function (response) {
        console.log('--xxxxxx ontent-script--', response);
    });
});