import { useState } from 'react';
import { createModel } from 'hox';

function useConsole() {
  // 元素跟踪
  const [consoleData, setConsoleData] = useState([
    { method: 'log', data: ['waiting....'] },
  ]);

  const handleConsole = (data) => {
    let temp = [];
    if (data instanceof Array) {
      temp = data.map((item) => {
        return { method: 'log', data: [item] };
      });
    } else {
      temp.push({ method: 'log', data: [data] });
    }

    setConsoleData((s) => {
      return [...s, ...temp];
    });
  };

  return {
    consoleData,
    handleConsole,
  };
}

export default createModel(useConsole);
