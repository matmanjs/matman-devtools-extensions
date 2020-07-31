import { useState } from 'react';
import { createModel } from 'hox';

function useSelector() {
  // 元素跟踪
  const [name, setName] = useState('body');

  return {
    name,
    setName,
  };
}

export default createModel(useSelector);
