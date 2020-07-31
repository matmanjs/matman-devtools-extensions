import { useState } from 'react';
import { createModel } from 'hox';

function useCode() {
  // 元素跟踪
  const [code, setCode] = useState('// Typing....');

  return {
    code,
    setCode,
  };
}

export default createModel(useCode);
