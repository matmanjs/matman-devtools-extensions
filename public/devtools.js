var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('matman', function (sidebar) {
  // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
  sidebar.setPage('index.html');
  sidebar.setHeight('12ex');
});
