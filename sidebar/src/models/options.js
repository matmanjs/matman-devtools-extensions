import { useState, useCallback } from 'react';
import { createModel } from 'hox';

const CODE_STYLE_TYPE = {
  UNKNOWN: 1,
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
  const [codeStyleType, setCodeStyleType] = useState(CODE_STYLE_TYPE.UNKNOWN);

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
    selectedDomCount,
    setSelectedDomCount,
  };
}

export default createModel(useOptions);
