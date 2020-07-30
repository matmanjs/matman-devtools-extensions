import React from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import Options from './components/Main';

function App() {
  return (
    <Layout>
      <Header />
      <Options />
      <Layout.Footer style={{ textAlign: 'center' }}>
        Matman ©2020 Created by Matmanjs
      </Layout.Footer>
    </Layout>
  );
}

export default App;
