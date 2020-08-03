/* global chrome */
import React from 'react';
import { Layout, Typography, Button, Tooltip } from 'antd';
import useCodeModel from '../../models/code';
import useConsoleModel from '../../models/console';

import styles from './index.module.scss';

const Index = () => {
  const { code } = useCodeModel();
  const { handelConsole } = useConsoleModel();

  const exec = () => {
    chrome.devtools.inspectedWindow.eval(
      `var module = {};
      ${code};
      module.exports();`,
      (result, isException) => {
        console.log(result, isException);
        handelConsole(result || isException);
      }
    );
  };

  return (
    <Layout.Header
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Typography.Title className={styles.title}>Matman</Typography.Title>
      <Tooltip title="请务必在代码中指定一个 module.exports 函数">
        <Button type="primary" onClick={exec}>
          执行
        </Button>
      </Tooltip>
    </Layout.Header>
  );
};

export default Index;
