import React from 'react';
import { Layout, Typography } from 'antd';

import styles from './index.module.less';

const Index = () => {
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
      {/* <Button type="primary" onClick={exec}>
        执行
      </Button> */}
    </Layout.Header>
  );
};

export default Index;
