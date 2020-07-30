import React, { useMemo, useEffect, useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import useOptionsModel from '../../../../models/options';
import useSelectorModel from '../../../../models/selector';
import { Tpl } from './tpl';

const options = {
  fontSize: 18,
  fontWeight: 'bold',
  automaticLayout: true,
};

const Index = () => {
  const [code, setCode] = useState('// Typing....');

  const { frameWork, codeMode } = useOptionsModel();

  const { name } = useSelectorModel();

  const resCode = useMemo(() => {
    let temp = {};
    codeMode.forEach((item) => {
      temp[item] = true;
    });

    return new Tpl(frameWork, name, temp).run();
  }, [frameWork, codeMode, name]);

  useEffect(() => {
    setCode(resCode);
  }, [setCode, resCode]);

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
