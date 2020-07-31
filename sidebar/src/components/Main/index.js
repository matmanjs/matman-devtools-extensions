import React from 'react';
import { Layout, Divider } from 'antd';
import Options from './components/Options';
import Editor from './components/Editor';

import styles from './index.module.scss';

const Index = () => {
  return (
    <Layout.Content style={{ padding: '50px', marginTop: 64 }}>
      <div
        className={styles.siteLayoutBackground}
        style={{ padding: 24, minHeight: 380 }}
      >
        <Options />
      </div>
      <Divider />
      <div
        className={`${styles.siteLayoutBackground} ${styles.editorContainer}`}
        style={{ padding: 24, height: 800 }}
      >
        <Editor />
      </div>
    </Layout.Content>
  );
};

export default Index;
