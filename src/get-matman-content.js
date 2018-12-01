(function () {
    // 与 background.js 建立 channel 连接
    const port = chrome.extension.connect({
        name: 'Devtools.js Communication'
    });

    // 只有这个面板才有执行代码权限
    const inspectedWindowId = chrome.devtools.inspectedWindow.tabId;

    // Listen to messages from the background page
    port.onMessage.addListener(function (message) {
        if (message.action === 'reloadExtension' && message.updatedTabId === inspectedWindowId) {
            const appNode = document.querySelector('#app');
            removeHTMLChilds(appNode);
            getPageTitle();
        }
    });

    function getPageTitle() {
        chrome.devtools.inspectedWindow.eval(
            'document.title',
            function (result, isException) {
                const appNode = document.querySelector('#app');
                const titleWrapper = document.createElement('div');
                const title = document.createTextNode(result);
                titleWrapper.appendChild(title);
                appNode.appendChild(title);
            }
        );
    }

    function removeHTMLChilds(HTMLNode) {
        while (HTMLNode.firstChild) {
            HTMLNode.removeChild(HTMLNode.firstChild);
        }
    }

    // init
    getPageTitle();
})();