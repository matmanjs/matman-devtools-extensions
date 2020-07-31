var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('matman', function (sidebar) {
  // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
  sidebar.setPage('sidebar/index.html');
  sidebar.setHeight('12ex');
});

chrome.devtools.panels.create('matman-exec', 'panel/index.html');
