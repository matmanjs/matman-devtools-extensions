/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';

import Main from './components/Main';
import useCodeModel from './models/code';
import useOptionsModel from './models/options';

const elements = chrome.devtools.panels.elements;

function App() {
  const { setCode } = useCodeModel();
  const {
    setWebCrawlUtilVersion,
    handleChangeSelector,
    selectorName,
    parentSelectorName,
    selectedParentSelector,
    codeStyleType,
    handleChangeCodeStyleType,
    setSelectedParentSelector,
    setSelectedDomCount,
    selector,
  } = useOptionsModel();

  // 注意，只能执行一次！！！！
  useEffect(() => {
    const updateSelectElement = () => {
      chrome.devtools.inspectedWindow.eval(`helperPageGetSelectedElement($0)`, {
        useContentScriptContext: true,
      });
    };

    // 选择的元素变化时
    // https://developer.chrome.com/extensions/devtools_panels#method-ExtensionSidebarPane-onSelectionChanged
    elements.onSelectionChanged.addListener(updateSelectElement);
    chrome.runtime.onMessage.addListener(function (message) {
      console.log(
        '[panel-sidbar.js][listenMsgFromContentScript] receive message',
        message
      );
      if (message.type === 'MATMAN_DEVTOOLS_HELPER_SELECTED_ELEMENT') {
        // selectedDomCount = 1 时重置初始值，此时很可能是用户刷新了页面
        if (message.data.selectedDomCount <= 1) {
          handleChangeCodeStyleType(1);
        }

        // 更新选择操作的次数
        setSelectedDomCount(message.data.selectedDomCount);

        // 更新 selector
        handleChangeSelector(message.data.selector);
      } else if (message.type === 'MATMAN_DEVTOOLS_HELPER_CREATE_SAMPLE_CODE') {
        // 设置 web-crawl-util 的版本号
        setWebCrawlUtilVersion(message.data.webCrawlUtilVersion);

        // 设置样例代码
        setCode(message.data.sampleCode);

        // if (message.data.opts.selectedParentSelector) {
        //   setSelectedParentSelector(message.data.opts.selectedParentSelector);
        // }
      }
    });
  }, []);

  // 注意，在这几个值变化的时候重新生成代码
  useEffect(() => {
    const updateSelectElement = () => {
      const opts = {
        selectorName,
        parentSelectorName,
        selectedParentSelector,
        codeStyleType,
        selector,
      };

      chrome.devtools.inspectedWindow.eval(
        `helperPageGetSampleCode("${selector}", ${JSON.stringify(opts)})`,
        {
          useContentScriptContext: true,
        }
      );
    };
    updateSelectElement();
  }, [
    selectorName,
    parentSelectorName,
    selectedParentSelector,
    codeStyleType,
    selector,
  ]);

  return (
    <Layout>
      <Main />
    </Layout>
  );
}

export default App;
