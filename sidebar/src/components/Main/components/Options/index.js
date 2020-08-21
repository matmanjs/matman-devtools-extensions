import React, { Fragment } from 'react';
import { Typography, Radio, Input } from 'antd';
import useOptionsModel from '../../../../models/options';

import styles from './index.module.less';

const Select = () => {
  const { selectorName, setSelectorName } = useOptionsModel();

  return (
    <>
      <Typography.Title level={4}>变量名</Typography.Title>
      <Input
        addonBefore="选择器变量名"
        placeholder="请输入选择器变量名"
        value={selectorName}
        defaultValue={selectorName}
        onChange={(e) => {
          setSelectorName(e.target.value);
        }}
      />
    </>
  );
};

const Parent = () => {
  const {
    parentSelectorName,
    setParentSelectorName,
    parentSelectorList,
    selectedParentSelector,
    setSelectedParentSelector,
    codeStyleType,
    selector,
  } = useOptionsModel();

  return (
    <>
      <div className={styles.area}>
        <Typography.Title level={4}>父级变量名</Typography.Title>
        <Input
          addonBefore="父级变量名"
          placeholder="请输入父级变量名"
          value={parentSelectorName}
          defaultValue={parentSelectorName}
          onChange={(e) => {
            setParentSelectorName(e.target.value);
          }}
        />
      </div>

      {parentSelectorList.length ? (
        <Fragment>
          <Typography.Title level={4}>父级</Typography.Title>
          <Radio.Group
            value={selectedParentSelector}
            defaultValue={selectedParentSelector}
            onChange={(e) => setSelectedParentSelector(e.target.value)}
          >
            {parentSelectorList.map((item, index) => {
              return (
                <Radio key={item} value={item}>
                  {item}
                </Radio>
              );
            })}
          </Radio.Group>
        </Fragment>
      ) : null}
    </>
  );
};

const Index = () => {
  const {
    codeStyleType,
    handleChangeCodeStyleType,
    webCrawlUtilVersion,
  } = useOptionsModel();

  const changeFrameWork = (e) => {
    handleChangeCodeStyleType(e.target.value);
  };

  // 选择器填写区域
  let main = null;

  if (codeStyleType === 2) {
    main = <Select />;
  } else if (codeStyleType === 3) {
    main = <Parent />;
  }

  return (
    <>
      <div>
        <Typography.Title level={4}>
          matman 爬虫小助手，请选择风格（web-crawl-util v{webCrawlUtilVersion}）
        </Typography.Title>
        <Radio.Group
          value={codeStyleType}
          defaultValue={codeStyleType}
          onChange={changeFrameWork}
        >
          <Radio value={1}>默认</Radio>
          <Radio value={2}>使用变量</Radio>
          <Radio value={3}>包含父级变量</Radio>
        </Radio.Group>
      </div>
      <div>{main}</div>
    </>
  );
};

export default Index;
