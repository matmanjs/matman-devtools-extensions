/*global chrome*/
import React, { useEffect } from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Main from './components/Main';
import useConsoleModel from './models/console';

function App() {
  const { handleConsole } = useConsoleModel();

  useEffect(() => {
    if (chrome && chrome.runtime && chrome.runtime.onMessage) {
      chrome.runtime.onMessage.addListener(function (message) {
        console.log(
          '[panel-sidbar.js][listenMsgFromContentScript] receive message',
          message,
        );
        if (message.type === 'SEND_MESSAGE_PROXY_CONSOLE_LOG') {
          handleConsole(message.data);
        }
      });
    }else{
      handleConsole('本地调试中...');
    }
  }, []);

  return (
    <Layout>
      <Header />
      <Main />
    </Layout>
  );
}

export default App;
