console.log('[matman-devtools] content scripts loaded');

// TODO 调试标记应该由面板控制
const MATMAN_DEVTOOLS_DEBUG = true;
const WEB_CRAWL_UTIL_VERSION = '1.1.0';

console.log(`[matman-devtools] web-crawl-util v${WEB_CRAWL_UTIL_VERSION}`);

let selectedDomCount = 0;

/**
 * 消息类型
 * @type {Object}
 */
const MATMAN_DEVTOOLS_MESSAGE_TYPE = {
  SEND_RESPONSE_GET_TIPS: 'CONTENT_SCRIPT_SEND_RESPONSE_GET_TIPS',
  HELPER_SELECTED_ELEMENT: 'MATMAN_DEVTOOLS_HELPER_SELECTED_ELEMENT',
  HELPER_CREATE_SAMPLE_CODE: 'MATMAN_DEVTOOLS_HELPER_CREATE_SAMPLE_CODE',
  SEND_MESSAGE_PROXY_CONSOLE_LOG: 'SEND_MESSAGE_PROXY_CONSOLE_LOG',
};

let matmanDevtoolsSelectedDom;

/**
 * helper小助手使用: 设置当前选中的元素，由 DevTools 传递过来
 * @param selectedDom 当前选中的 DOM 元素
 */
function helperPageGetSelectedElement(selectedDom) {
  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] helperPageGetSelectedElement', selectedDom);
  }

  // 记录选择次数
  selectedDomCount++;

  // 缓存当前选中的 dom
  matmanDevtoolsSelectedDom = selectedDom;

  // 获取相关数据
  const data = {
    selector: getSelector(selectedDom),
    selectedDomCount,
  };

  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] helperPageGetSelectedElement data', data);
  }

  // 传递数据到 DevTools helper page
  chrome.runtime.sendMessage({
    type: MATMAN_DEVTOOLS_MESSAGE_TYPE.HELPER_SELECTED_ELEMENT,
    data: data,
  });
}

/**
 * helper小助手使用: 通过选择器名字获得样例代码
 * @param selector 当前选中的 DOM 元素的 selector
 * @param opts 额外参数
 */
function helperPageGetSampleCode(selector, opts) {
  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] helperPageGetSampleCode', selector, opts);
  }

  // 获取相关数据
  const data = {
    selector,
    webCrawlUtilVersion: WEB_CRAWL_UTIL_VERSION,
    sampleCode: createSampleCodeBySelector(selector, opts),
    opts,
  };

  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] helperPageGetSampleCode data', data);
  }

  // 传递数据到 DevTools helper page
  chrome.runtime.sendMessage({
    type: MATMAN_DEVTOOLS_MESSAGE_TYPE.HELPER_CREATE_SAMPLE_CODE,
    data: data,
  });
}

/**
 * 劫持 console.log
 */
function proxyConsole(...args) {
  chrome.runtime.sendMessage({
    type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_MESSAGE_PROXY_CONSOLE_LOG,
    data: args,
  });
}

/**
 * 向页面中注入一些自定义的代码以便调试
 */
function injectScriptToContentPage() {
  // 向页面中注入 JS
  function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';

    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    temp.src = chrome.extension.getURL(jsPath);

    temp.onload = function () {
      this.parentNode.removeChild(this);
    };

    document.body.appendChild(temp);
  }

  injectCustomJs('lodash.min.js');
  injectCustomJs('jquery.3.3.1.min.js');
  injectCustomJs(`web-crawl-util.${WEB_CRAWL_UTIL_VERSION}.min.js`);
}

// 监听来自 DevTools page 的消息，然后再回调信息
// 例如可获取到 DOM 或 window 等信息，再传回到 DevTools page 做展示
// DevTools page 通过 chrome.tabs.sendMessage 来发送消息
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] receive message', message);
  }

  // 如果当前没有已选中的 dom ，则不做其他处理
  if (!matmanDevtoolsSelectedDom) {
    sendResponse({
      type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_RESPONSE_GET_TIPS,
      data: {
        error: 'selected dom is undefined!',
      },
    });

    return;
  }

  let selectedDom = matmanDevtoolsSelectedDom;

  // 接收到新的指令，获取到 DOM 或 window 的信息
  let data = {
    className: selectedDom.getAttribute('class'),
    text: selectedDom.innerHTML,
  };

  if (MATMAN_DEVTOOLS_DEBUG) {
    console.log('[matman-devtools] selected dom data', data);
  }

  // 传回到 DevTools page
  sendResponse({
    type: MATMAN_DEVTOOLS_MESSAGE_TYPE.SEND_RESPONSE_GET_TIPS,
    data: data,
  });
});

/**
 * 通过选择的 DOM ，获得 selector 选择器
 *
 * @param {DOM} dom
 * @returns {String}
 */
function getSelector(dom) {
  let path;
  let i;
  const originalDom = dom;

  for (path = '', i = 0; dom && dom.nodeType === 1; dom = dom.parentNode, i++) {
    // 有 id 的情况直接退出
    if (dom.id) {
      path = '#' + dom.id + ' ' + path;
      break;
    }

    // 可能会有多个class
    if (dom.className) {
      path = '.' + dom.className.trim().split(/\s+/).join('.') + ' ' + path;
    } else if (i === 0) {
      // 如果是当前 dom 节点，且无 class，则使用其 tagName
      path = dom.tagName.toLowerCase();
    }
  }

  let result = path.trim();

  // 注意，有可能会有多个结果，此时需要加上序号，确保唯一，
  // 例如如果 #expTable .head th 有多个值，
  // 则会追加序号来区别L #expTable .head th:nth-child(6)
  const selectorAll = document.querySelectorAll(result);
  if (selectorAll && selectorAll.length > 1) {
    for (let index = 0; index < selectorAll.length; index++) {
      const element = selectorAll[index];
      if (element === originalDom) {
        result = `${result}:eq(${index})`;
        break;
      }
    }
  }

  return result;
}

const CODE_STYLE_TYPE = {
  DEFAULT: 1,
  SELECTOR: 2,
  PARENT: 3,
};

/**
 * 通过制定的 selector 生成代码
 *
 * @param {String} selector
 * @param {Object} opts
 * @param {Number} opts.codeStyleType
 * @param {String} opts.parentSelectorName
 * @param {String} opts.selectorName
 * @param {String} opts.selectedParentSelector
 */
function createSampleCodeBySelector(selector, opts = {}) {
  const result = [];
  const { useJquery } = window.webCrawlUtil || {};

  // 除了父级选择器之外的部分 selector 值
  const otherSelectorWithoutParent =
    opts.selectedParentSelector &&
    selector.replace(opts.selectedParentSelector, '').trim();

  // useJquery.xxx(yy) 中 yy 的值
  let useQueryParamContentStr;
  switch (opts.codeStyleType) {
    case CODE_STYLE_TYPE.SELECTOR:
      useQueryParamContentStr = `${opts.selectorName}`;
      break;
    case CODE_STYLE_TYPE.PARENT:
      useQueryParamContentStr = `"${otherSelectorWithoutParent}", ${opts.parentSelectorName}`;
      break;
    default:
      useQueryParamContentStr = `"${selector}"`;
      break;
  }

  result.push(`// [当前选中的元素 selector 值]： ${selector}`);
  switch (opts.codeStyleType) {
    case CODE_STYLE_TYPE.SELECTOR:
      result.push(`const ${opts.selectorName} = "${selector}";`);
      break;
    case CODE_STYLE_TYPE.PARENT:
      result.push(`const selector = "${selector}";`);
      result.push(
        `const ${opts.parentSelectorName} = "${opts.selectedParentSelector}";`,
      );
      break;
    default:
      result.push(`const selector = "${selector}";`);
      break;
  }
  result.push('');

  if (typeof useJquery !== 'undefined') {
    result.push(`// [是否存在]： ${useJquery.isExist(selector)}`);
    result.push(
      `const isExist = useJquery.isExist(${useQueryParamContentStr});`,
    );
    result.push('');

    if (
      $(selector).is('input') ||
      $(selector).is('select') ||
      $(selector).is('textarea')
    ) {
      result.push(`/* [获得 input/select/textarea 元素中的值]：`);
      result.push(`${useJquery.getVal(selector)}`);
      result.push(`*/`);
      result.push(`const val = useJquery.getVal(${useQueryParamContentStr});`);
      result.push('');
    } else if ($(selector).is('img')) {
      const imageDomUrl = useJquery.getImageDomUrl(selector);
      if (imageDomUrl) {
        result.push(`// [img 标签中图片的地址]： ${imageDomUrl}`);
        result.push(
          `const imageDomUrl = useJquery.getImageDomUrl(${useQueryParamContentStr});`,
        );
        result.push('');
      }
    } else if ($(selector).is('table')) {
      const dataFromTable = useJquery.getDataFromTable(selector);
      if (dataFromTable) {
        result.push(`/* [获得table表格中的数据]：`);
        result.push(`${JSON.stringify(dataFromTable)}`);
        result.push(`*/`);
        result.push(
          `const dataFromTable = useJquery.getDataFromTable(${useQueryParamContentStr});`,
        );
        result.push('');
      }
    } else {
      result.push(`/* [文本内容]：`);
      result.push(`${useJquery.getText(selector)}`);
      result.push(`*/`);
      result.push(
        `const text = useJquery.getText(${useQueryParamContentStr});`,
      );
      result.push('');
    }

    result.push(`// [匹配个数]： ${useJquery.getTotal(selector)}`);
    result.push(
      `const total = useJquery.getTotal(${useQueryParamContentStr});`,
    );
    result.push('');

    result.push(
      `// [获得dom上的属性，举例获取 class]： ${useJquery.getAttr(
        'class',
        selector,
      )}`,
    );
    result.push(
      `const attrClass = useJquery.getAttr('class', ${useQueryParamContentStr});`,
    );
    result.push('');

    const styleObj = useJquery.getStyle(selector);
    result.push(`/* [dom 元素中的部分计算属性值]：`);
    result.push(`${JSON.stringify(styleObj, null, 2)}`);
    result.push(
      `注意：你也可以通过 useJquery.getComputedStyle(${useQueryParamContentStr}) 方法获得更多计算属性`,
    );
    result.push(`*/`);
    result.push(
      `const styleObj = useJquery.getStyle(${useQueryParamContentStr});`,
    );
    result.push('');

    const backgroundImageUrl = useJquery.getBackgroundImageUrl(selector);
    if (backgroundImageUrl) {
      result.push(`// [背景图地址]： ${backgroundImageUrl}`);
      result.push(
        `const backgroundImageUrl = useJquery.getBackgroundImageUrl(${useQueryParamContentStr});`,
      );
      result.push('');
    }
  } else {
    result.push(`// window.webCrawlUtil.useJquery 不存在`);
    result.push('');
  }

  return result.join('\n');
}
