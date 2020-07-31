/* global chrome */
import React from 'react';
import { Layout, Typography, Button } from 'antd';
import useOptionsModel from '../../models/options';
import useCodeModel from '../../models/code';

import styles from './index.module.scss';

const Index = () => {
  const { frameWork } = useOptionsModel();
  const { code } = useCodeModel();

  const exec = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length) {
        chrome.tabs.executeScript(tabs[0].id, {
          code: `console.log((${code})())`,
        });
      }
    });
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
      <Button disabled={frameWork !== 1} type="primary" onClick={exec}>
        执行
      </Button>
    </Layout.Header>
  );
};

export default Index;
