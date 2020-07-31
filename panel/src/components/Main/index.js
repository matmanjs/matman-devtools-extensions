import React from 'react';
import { Layout } from 'antd';
import Editor from './components/Editor';
import Console from './components/Console';

import styles from './index.module.scss';

const Index = () => {
  return (
    <Layout.Content style={{ padding: '50px', marginTop: 64, display: 'flex' }}>
      <div
        className={styles.siteLayoutBackground}
        style={{
          padding: 12,
          minHeight: 380,
          flex: '1',
        }}
      >
        <Console />
      </div>
      <div
        className={`${styles.siteLayoutBackground} ${styles.editorContainer}`}
        style={{ padding: 12, height: 800, flex: '2', minWidth: 300 }}
      >
        <Editor />
      </div>
    </Layout.Content>
  );
};

export default Index;
