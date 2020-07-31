/* global chrome */
import React from 'react';
import { Layout, Typography } from 'antd';

import styles from './index.module.scss';

const Index = () => {
  // const exec = () => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //     if (tabs.length) {
  //       chrome.tabs.executeScript(tabs[0].id, {
  //         code: `var useJquery=function(t){"use strict";function e(t,e){return $(t,e).length}function r(t,e){var r=$(t,e)[0];if(!r)return{isExist:!1};var n=document.defaultView.getComputedStyle(r);return{isExist:!0,width:n.width,height:n.height,lineHeight:n.lineHeight,isOneLine:parseInt(n.height)===parseInt(n.lineHeight),computedStyle:n}}return t.getAttr=function(t,e,r){var n=$(e,r);return $.trim(n.attr(t))},t.getBackgroundImageUrl=function(t,e){var n=r(t,e).computedStyle;return n&&(n.backgroundImage.match(/url\\("(.*)"\\)/)||[])[1]||""},t.getImageDomUrl=function(t,e){var r=$(t,e);return $.trim(r.attr("src"))},t.getStyle=r,t.getText=function(t,e){var r=$(t,e);return $.trim(r.text())},t.getTotal=e,t.isExist=function(t,r){return e(t,r)>0},t}({});
  //         console.log((${code})())`,
  //       });
  //     }
  //   });
  // };

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
