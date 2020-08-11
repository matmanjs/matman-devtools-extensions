import React from 'react';
import { Layout } from 'antd';
import Editor from './components/Editor';
import Console from './components/Console';
import useFullPageModel from '../../models/fullPage';

import styles from './index.module.less';

const Index = () => {
  const { fullPage } = useFullPageModel();

  return (
    <Layout.Content
      style={{
        padding: '50px',
        marginTop: 64,
        display: 'flex',
        height: 'calc(100vh - 134px)',
      }}
    >
      {fullPage ? null : (
        <div
          className={styles.siteLayoutBackground}
          style={{
            padding: 12,
            minHeight: 380,
            height: '100%',
          }}
        >
          <Console />
        </div>
      )}
      <div
        className={`${styles.siteLayoutBackground} ${styles.editorContainer}`}
        style={{ padding: 12, height: '100%', width: '100%', minWidth: 300 }}
      >
        <Editor />
      </div>
    </Layout.Content>
  );
};

export default Index;
