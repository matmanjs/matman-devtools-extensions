import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import useCodeModel from '../../../../models/code';

const options = {
  fontSize: 14,
  // fontWeight: 'bold',
  automaticLayout: true,
};

const Index = () => {
  const { code, setCode } = useCodeModel();

  const handleCodeChange = (e) => {
    setCode(e);
  };

  return (
    <>
      <MonacoEditor
        language="javascript"
        theme="vs-dark"
        options={options}
        value={code}
        onChange={handleCodeChange}
      />
    </>
  );
};

export default Index;
