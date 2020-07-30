import React from 'react';
import { Layout, Typography } from 'antd';

import styles from './index.module.scss';

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
    </Layout.Header>
  );
};

export default Index;
