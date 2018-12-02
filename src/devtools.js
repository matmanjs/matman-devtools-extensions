/**
 * 处理选中的 dom 内容
 */
// function handleContents() {
//     if (!$0) {
//         return;
//     }
//     var curElem = $0;
//
//     // 当前选择的元素为 $0
//     var data = {};
//
//     if (window.jQuery) {
//         var $el = window.jQuery(curElem);
//
//         data.className = $el.attr('class');
//         data.text = jQuery.trim($el.text());
//         data.jquery = true;
//     } else {
//         data.className = curElem.getAttribute('class');
//         data.text = curElem.innerText;
//         data.jquery = false;
//     }
//
//     // 选择器
//     data.selector = (function (dom) {
//         var path;
//
//         for (path = ''; dom && dom.nodeType == 1; dom = dom.parentNode) {
//             // 有 id 的情况直接退出
//             if (dom.id) {
//                 path = '#' + dom.id + ' ' + path;
//                 break;
//             }
//
//             // 可能会有多个class
//             if (dom.className) {
//                 path = '.' + dom.className.split(/\s+/).join('.') + ' ' + path;
//             }
//         }
//
//         return path.trim();
//     })(curElem);
//
//     window.postMessage({
//         greeting: 'injected script  window.postMessage',
//         source: 'my-devtools-extension',
//         data: data
//     }, '*');
//
//     return data;
// }

var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('matman', function (sidebar) {
    // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
    sidebar.setPage('panel-sidebar.html');
    sidebar.setHeight('12ex');

    let panelWindow;

    const getPanelWindow = (extPanelWindow) => {
        panelWindow = extPanelWindow;
        updateSelectElement();
    };

    const updateSelectElement = () => {
        // chrome.devtools.inspectedWindow.eval(
        //     '(' + handleContents.toString() + ')()',
        //     (result, isException) => {
        //         console.log(result);
        //
        //         // https://developer.chrome.com/extensions/runtime#method-sendMessage
        //         chrome.runtime.sendMessage({ greeting: 'hello', result: result }, function (response) {
        //             console.log('[devtools.js] --i got response at devtool.js--', response);
        //         });
        //     }
        // );

        chrome.devtools.inspectedWindow.eval('setSelectedElement($0)', { useContentScriptContext: true });
    };

    // 展示的时候开始监听
    sidebar.onShown.addListener(getPanelWindow);

    // 选择的元素变化时
    // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
    elements.onSelectionChanged.addListener(updateSelectElement);
});


