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
        data.jquery = true;
    } else {
        data.className = curElem.getAttribute('class');
        data.text = curElem.innerText;
        data.jquery = false;
    }

    return data;
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

var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('matman', function (sidebar) {
    // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
    sidebar.setPage('sidebar.html');
    sidebar.setHeight('12ex');

    let panelWindow;

    const getAcssClass = extPanelWindow => {
        panelWindow = extPanelWindow;
        updateAcssClass();
    };

    const updateAcssClass = () => {
        chrome.devtools.inspectedWindow.eval(
            '(' + handleContents.toString() + ')()',
            (result, isException) => {
                console.log(result);

                // https://developer.chrome.com/extensions/runtime#method-sendMessage
                chrome.runtime.sendMessage({ greeting: 'hello', result: result }, function (response) {
                    console.log('--i got response at devtool.js--', response);
                });
            }
        );
    };

    // 展示的时候开始监听
    sidebar.onShown.addListener(getAcssClass);

    // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
    elements.onSelectionChanged.addListener(updateAcssClass);
});


