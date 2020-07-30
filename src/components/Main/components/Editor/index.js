import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const options = {
  fontSize: 18,
  fontWeight: 'bold',
};

const code = '// emmm';

const Index = () => {
  return (
    <>
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        options={options}
        value={code}
      />
    </>
  );
};

export default Index;
