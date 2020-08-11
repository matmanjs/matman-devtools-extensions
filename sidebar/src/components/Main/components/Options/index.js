import React from 'react';
import { Typography, Switch, Radio, Checkbox, Divider } from 'antd';
import useOptionsModel from '../../../../models/options';

import styles from './index.module.less';

const plainOptions = ['text', 'length'];

const Index = () => {
  const {
    trace,
    setTrace,
    frameWork,
    setFrameWork,
    codeMode,
    setCodeMode,
  } = useOptionsModel();

  const changeTrace = () => {
    setTrace((s) => !s);
  };

  const changeFrameWork = (e) => {
    setFrameWork(e.target.value);
  };

  const changeCodeMode = (e) => {
    setCodeMode(e);
  };

  return (
    <>
      {/* 跟踪选项 */}
      <div className={styles.area}>
        <Typography.Title level={4}>是否跟踪选择</Typography.Title>
        <Switch
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
          checked={trace}
          onChange={changeTrace}
        />
      </div>
      <Divider />
      {/* jquery 和 utils 选项 */}
      <div className={styles.area}>
        <Typography.Title level={4}>选择使用的库</Typography.Title>
        <Radio.Group value={frameWork} onChange={changeFrameWork}>
          <Radio value={1}>JQuery</Radio>
          <Radio value={2}>web-crawl-util</Radio>
        </Radio.Group>
      </div>
      <Divider />
      {/* jquery 和 utils 选项 */}
      <div>
        <Typography.Title level={4}>选择模板类型</Typography.Title>
        <Checkbox.Group
          options={plainOptions}
          value={codeMode}
          onChange={changeCodeMode}
        />
      </div>
    </>
  );
};

export default Index;
