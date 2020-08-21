import { useState } from 'react';
import { createModel } from 'hox';

const CODE_STYLE_TYPE = {
  DEFAULT: 1,
  SELECTOR: 2,
  PARENT: 3,
};

const headerHeightMap = {
  [CODE_STYLE_TYPE.DEFAULT]: 130 - 10,
  [CODE_STYLE_TYPE.SELECTOR]: 200 - 10,
  [CODE_STYLE_TYPE.PARENT]: 300 - 10,
};

function useOptions() {
  // 代码风格
  const [codeStyleType, setCodeStyleType] = useState(1);

  // 选择器变量名称
  const [selectorName, setSelectorName] = useState('selector');

  // 父级选择器名称
  const [parentSelectorName, setParentSelectorName] = useState(
    'parentSelector'
  );

  // editor height
  const [editorHeight, setEditorHeight] = useState(
    document.body.offsetHeight - headerHeightMap[codeStyleType]
  );

  // 当前选中的 selector
  const [selector, setSelector] = useState('');

  // web-crawl-util 版本号
  const [webCrawlUtilVersion, setWebCrawlUtilVersion] = useState('');

  // 选择了多少次 element
  const [selectedDomCount, setSelectedDomCount] = useState(0);

  // 父级选择器列表
  const [parentSelectorList, setParentSelectorList] = useState([]);
  const [selectedParentSelector, setSelectedParentSelector] = useState('');

  const handleChangeCodeStyleType = (val) => {
    setCodeStyleType(val);

    // 每次切换代码风格时，重新计算代码编辑区域的高度
    // TODO 这里需要更智能判断，包括浏览器大小变动
    const newEditorHeight = document.body.offsetHeight - headerHeightMap[val];
    setEditorHeight(newEditorHeight);
  };

  const handleChangeSelector = (selector) => {
    setSelector(selector);

    const curParentSelectorList = getParentSelectorList(selector);
    setParentSelectorList(curParentSelectorList);

    console.log('====1====', selector, curParentSelectorList);

    // 如果当前父 selector 为空，或者不是选择列表中的值，则设置默认值
    // if (
    //   curParentSelectorList.length &&
    //   (!selectedParentSelector ||
    //     curParentSelectorList.indexOf(selectedParentSelector) < 0)
    // ) {
    //   console.log('====2====', curParentSelectorList[0]);
    //   setSelectedParentSelector(curParentSelectorList[0]);
    // }
  };

  return {
    codeStyleType,
    handleChangeCodeStyleType,
    selectorName,
    setSelectorName,
    parentSelectorName,
    setParentSelectorName,
    parentSelectorList,
    setParentSelectorList,
    selectedParentSelector,
    setSelectedParentSelector,
    editorHeight,
    setEditorHeight,
    selector,
    setSelector,
    webCrawlUtilVersion,
    setWebCrawlUtilVersion,
    handleChangeSelector,
    selectedDomCount,
    setSelectedDomCount,
  };
}

function getParentSelectorList(selector = '') {
  const arr = selector.split(/\s+/);

  const actualSelectorArr = [];
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i].trim();
    if (item) {
      actualSelectorArr.push(item);

      if (!result.length) {
        result.push(item);
      } else {
        result.push(`${result[result.length - 1]} ${item}`);
      }
    }
  }

  return result.filter(
    (item) => !/>$/.test(item) && item !== actualSelectorArr.join(' ')
  );
}

export default createModel(useOptions);
