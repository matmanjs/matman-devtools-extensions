var elements = chrome.devtools.panels.elements;

elements.createSidebarPane('Matman', function (sidebar) {
  // https://developer.chrome.com/extensions/devtools.panels#method-ExtensionSidebarPane-setPage
  sidebar.setPage('sidebar/index.html');
  sidebar.setHeight('12ex');
});

chrome.devtools.panels.create(
  'Matman',
  'icons/icon16.png',
  'panel/index.html'
);
