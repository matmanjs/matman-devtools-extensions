/* global chrome */
import { useEffect, useState } from 'react';
import { createModel } from 'hox';

function useCode() {
  const initialCode = `
// Typing....
module.exports = () => {
  return {
    remarks: 'Got data by npm package: web-crawl-util',
  };
};
`;

  // 元素跟踪
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.local.get({ code: initialCode }, (item) => {
        setCode(item.code);
      });
    }
  }, []);

  useEffect(() => {
    if (chrome && chrome.storage) {
      chrome.storage.local.set({ code: code });
    }
  }, [code]);

  return {
    code,
    setCode,
  };
}

export default createModel(useCode);
