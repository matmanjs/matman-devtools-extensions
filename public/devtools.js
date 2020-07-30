var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('matman', function (sidebar) {
  // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
  sidebar.setPage('index.html');
  sidebar.setHeight('12ex');

  const updateSelectElement = () => {
    chrome.devtools.inspectedWindow.eval('setSelectedElement($0)', {
      useContentScriptContext: true,
    });
  };

  // 展示的时候开始监听
  sidebar.onShown.addListener(() => {
    updateSelectElement();
  });

  // 选择的元素变化时
  // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
  elements.onSelectionChanged.addListener(updateSelectElement);
});
