import React from 'react';
import { Layout, Modal } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

import Editor from './components/Editor';
import Console from './components/Console';
import useFullPageModel from '../../models/fullPage';
import useShowTipsModel from '../../models/show-tips';

import styles from './index.module.less';

const Index = () => {
  const { fullPage } = useFullPageModel();
  const {
    isShowTips,
    setIsShowTips,
  } = useShowTipsModel();

  return (
    <Layout.Content
      style={{
        marginTop: 64,
        display: 'flex',
        height: 'calc(100vh - 80px)',
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
        style={{
          padding: 12,
          height: '100%',
          width: '100%',
          minWidth: 300,
          position: 'relative',
        }}
      >
        <QuestionCircleOutlined
          style={{
            fontSize: '24px',
            color: '#1890ff',
            position: 'absolute',
            zIndex: 10,
            left: 12,
            top: 12,
          }}
          onClick={() => {
            setIsShowTips(true);
          }}
        />
        <Editor />
      </div>

      <Modal
        title="提示"
        visible={isShowTips}
        width={'90%'}
        onOk={() => {
          setIsShowTips(false);
        }}
        onCancel={() => {
          setIsShowTips(false);
        }}
        className={styles.tipsDlg}
      >
        <p>点击【执行】按钮之后，会运行控制台代码。</p>
        <p>您可以使用 <code>console.log(xxx)</code> 来打印调试，也可以通过如下方式自动计算结果：</p>
        <pre>
          <code>
{`module.exports = () => {
  return {
    remarks: 'Got data by npm package: web-crawl-util',
  };
}`}
          </code>
        </pre>
      </Modal>
    </Layout.Content>
  );
};

export default Index;
