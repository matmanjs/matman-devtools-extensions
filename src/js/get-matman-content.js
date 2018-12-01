const port = chrome.extension.connect({
    name: 'mytesttt'
});

const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;

// Listen to messages from the background page
port.onMessage.addListener(function (message) {
    console.log('-----=======port.onMessage======----', message, inspectedWindowId);
});

chrome.extension.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('--onMessage--', request);
        sendResponse({ farewell: 'i got your message, and saygoodbye' });
    });

function getPageTitle() {
    console.log('======setPageTitle==');
    chrome.devtools.inspectedWindow.eval(
        'document.title',
        function (result, isException) {
            console.log('======cument.title==', result);

            const appNode = document.querySelector('#app');
            const titleWrapper = document.createElement('div');
            const title = document.createTextNode(result);
            titleWrapper.appendChild(title);
            appNode.appendChild(title);
        }
    );
}

getPageTitle();
// chrome.devtools.inspectedWindow.eval(
//     "$0",
//     function(result, isException) {
//         console.log('========result========',result)
//         const appNode = document.querySelector('#app');
//         const titleWrapper = document.createElement('div');
//         const title = document.createTextNode('==1==' + result.innerText);
//         titleWrapper.appendChild(title);
//         appNode.appendChild(title);
//     }
// );

//
// (function () {
//     console.log('1111111')
//     // 与 background.js 建立 channel 连接
//     const port = chrome.extension.connect({
//         name: 'Devtools.js Communication'
//     });
//
//     console.log('222222222',port)
//     // 只有这个面板才有执行代码权限
//     const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;
//
//     console.log('33333333333',inspectedWindowId)
//
//     // Listen to messages from the background page
//     port.onMessage.addListener(function (message) {
//         console.log('4444port.onMessage.addListener44444', message)
//         if (message.action === 'reloadExtension' && message.updatedTabId === inspectedWindowId) {
//             const appNode = document.querySelector('#app');
//             removeHTMLChilds(appNode);
//             getPageTitle();
//         }
//     });
//
//     function getPageTitle() {
//         // chrome.devtools.inspectedWindow.eval(
//         //     'document.title',
//         //     function (result, isException) {
//         //         const appNode = document.querySelector('#app');
//         //         const titleWrapper = document.createElement('div');
//         //         const title = document.createTextNode(result);
//         //         titleWrapper.appendChild(title);
//         //         appNode.appendChild(title);
//         //     }
//         // );
//
//         const appNode = document.querySelector('#app');
//         const titleWrapper = document.createElement('div');
//         const title = document.createTextNode('hello,text');
//         titleWrapper.appendChild(title);
//         appNode.appendChild(title);
//     }
//
//     function removeHTMLChilds(HTMLNode) {
//         while (HTMLNode.firstChild) {
//             HTMLNode.removeChild(HTMLNode.firstChild);
//         }
//     }
//
//     // init
//     getPageTitle();
// })();