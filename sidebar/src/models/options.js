import { useState } from 'react';
import { createModel } from 'hox';

function useOptions() {
  // 元素跟踪
  const [trace, setTrace] = useState(true);

  // 使用框架
  const [frameWork, setFrameWork] = useState(2);

  // 需要生成的代码片段
  const [codeMode, setCodeMode] = useState([]);

  return {
    trace,
    setTrace,
    frameWork,
    setFrameWork,
    codeMode,
    setCodeMode,
  };
}

export default createModel(useOptions);
