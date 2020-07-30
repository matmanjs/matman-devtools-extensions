import { useState } from 'react';
import { createModel } from 'hox';
import useOptionsModel from './options';

function useSelector() {
  const { trace } = useOptionsModel();

  // 元素跟踪
  const [name, setName] = useState('body');

  const changeName = (e) => {
    if (!trace) {
      return;
    }

    setName(e);
  };

  return {
    name,
    changeName,
  };
}

export default createModel(useSelector);
