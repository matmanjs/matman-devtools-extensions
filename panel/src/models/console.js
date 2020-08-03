import { useState } from 'react';
import { createModel } from 'hox';

function useConsole() {
  // 元素跟踪
  const [consoleData, setConsoleData] = useState([
    { method: 'log', data: ['waiting....'] },
  ]);

  const handelConsole = (data) => {
    setConsoleData((s) => {
      return [...s, { method: 'log', data: [data] }];
    });
  };

  return {
    consoleData,
    handelConsole,
  };
}

export default createModel(useConsole);
