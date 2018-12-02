new Vue({
    el: '#app',
    data: {
        test: '# hello',
        showData: ''
    },
    created() {
        console.log('--created--');
        const self = this;

        // https://developer.chrome.com/extensions/runtime#event-onMessage
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('--onMessage--', message);

            sendResponse({
                farewell: 'i got your message, and say '+message.result && message.result.text,
            });

            self.showData = JSON.stringify(message);

            const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;

            // https://developer.chrome.com/extensions/tabs#method-sendMessage
            chrome.tabs.sendMessage(inspectedWindowId, { text: message.result && message.result.text }, function (response) {
                console.log('--chrome.tabs.sendMessage from get-matman-content.js--', response);
            });
        });
    }
});

// chrome.runtime.onConnect.addListener(function (port) {
//     chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//         if (changeInfo.status === 'complete') {
//             reloadExtension(port, tabId);
//         }
//     });
//
//     function reloadExtension(port, tabId) {
//         const message = { action: "reloadExtension", updatedTabId: tabId };
//         port.postMessage(message);
//     }
// });

// chrome.runtime.onMessage.addListener(
//     function (request, sender, sendResponse) {
//         console.log('--onMessage22223--', request);
//     });
//
// chrome.runtime.onConnect.addListener(function(port) {
//     console.assert(port.name == "knockknock");
//     port.onMessage.addListener(function(msg) {
//         if (msg.joke == "Knock knock")
//             port.postMessage({question: "Who's there?"});
//         else if (msg.answer == "Madame")
//             port.postMessage({question: "Madame who?"});
//         else if (msg.answer == "Madame... Bovary")
//             port.postMessage({question: "I don't get it."});
//     });
// });

/**
 获取元素的xpath
 特性：
 - 转换xpath为csspath进行jQuery元素获取
 - 仅生成自然表述路径（不支持非、或）
 @param dom {String/Dom} 目标元素
 @returns {String} dom的xpath路径
 */
function getDomXpath(dom) {
    dom = $(dom).get(0);
    var path = '';
    for (; dom && dom.nodeType == 1; dom = dom.parentNode) {
        var index = 1;
        for (var sib = dom.previousSibling; sib; sib = sib.previousSibling) {
            if (sib.nodeType == 1 && sib.tagName == dom.tagName)
                index++;
        }
        var xname = dom.tagName.toLowerCase();
        if (dom.id) {
            xname += '[@id="' + dom.id + '"]';
        } else {
            if (index > 0)
                xname += '[' + index + ']';
        }
        path = '/' + xname + path;
    }

    path = path.replace('html[1]/body[1]/', 'html/body/');

    return path;
}

/**
 获取元素的xpath
 特性：
 - 转换xpath为csspath进行jQuery元素获取
 - 仅生成自然表述路径（不支持非、或）
 @param dom {String/Dom} 目标元素
 @returns {String} dom的xpath路径
 */
function getDomSelector(dom) {
    dom = $(dom).get(0);

    var path;

    for (path = ''; dom && dom.nodeType == 1; dom = dom.parentNode) {
        // 有 id 的情况直接退出
        if (dom.id) {
            path = '#' + dom.id + ' ' + path;
            break;
        }

        // 可能会有多个class
        if (dom.className) {
            path = '.' + dom.className.split(/\s+/).join('.') + ' ' + path;
        }
    }

    return path.trim();
}

// https://www.cnblogs.com/Titus/p/4763455.html