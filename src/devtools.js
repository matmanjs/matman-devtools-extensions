/**
 * 处理选中的 dom 内容
 */
function handleContents() {
    if (!$0) {
        return;
    }

    var curElem = $0;

    // 当前选择的元素为 $0
    var data = {};

    if (window.jQuery) {
        var $el = window.jQuery(curElem);

        data.className = $el.attr('class');
        data.text = jQuery.trim($el.text());
    } else {
        data.className = curElem.getAttribute('class');
        data.text = curElem.innerText;
    }

    return data;
};

var elements = chrome.devtools.panels.elements;

// elements.createSidebarPane('matman', function (sidebar) {
//     function updateElementProperties() {
//         // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-setExpression
//         // sidebar.setExpression('(' + handleContents.toString() + ')()');
//
//         // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-setObject
//         // sidebar.setObject({
//         //     some_data: {
//         //         name: 'sdfdsfds',
//         //         age: 2
//         //     }
//         // });
//
//         /// https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
//     }
//
//     updateElementProperties();
//
//     elements.onSelectionChanged.addListener(updateElementProperties);
// });

var i=0;

elements.createSidebarPane('matman', function (sidebar) {

    sidebar.setPage('panel.html');
    sidebar.setHeight('12ex');

    elements.onSelectionChanged.addListener(function () {
        // chrome.devtools.inspectedWindow.eval("setSelectedElement($0)",
        //     { useContentScriptContext: true });

        chrome.devtools.inspectedWindow.eval('$0', (result) => {
            console.log('=dfdfd===', result);
            i++;
            sidebar.setObject({
                some_data: {
                    name: 'te'+i,
                    age: 3,
                    result: 'result='+result,
                    ty: typeof result
                }
            });
        });

        // chrome.devtools.inspectedWindow.eval( "JSON.stringify(context.getStore())"。
    });
    //
    // function handleSelectedElement() {
    //     browser.devtools.inspectedWindow.eval("$0.textContent")
    //         .then((result) => {
    //             console.log(result[0]);
    //         });
    // }
    //
    // elements.onSelectionChanged.addListener(handleSelectedElement);

    //
    // function updateElementProperties() {
    //     // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-setExpression
    //     // sidebar.setExpression('(' + handleContents.toString() + ')()');
    //
    //     console.log('===13==');
    //
    //     // chrome.devtools.inspectedWindow.eval('setSelectedElement($0)',
    //     //     { useContentScriptContext: true });
    //
    //     // chrome.devtools.inspectedWindow.eval("setSelectedElement($0)",
    //     //     { useContentScriptContext: true });
    //     // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-setObject
    //     // sidebar.setObject({
    //     //     some_data: {
    //     //         name: 'sdfdsfds',
    //     //         age: 2
    //     //     }
    //     // });
    //
    //     /// https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
    // }
    //
    // updateElementProperties();

    // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
    // elements.onSelectionChanged.addListener(updateElementProperties);
});
