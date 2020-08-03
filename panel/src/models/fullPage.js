import { useState, useEffect } from 'react';
import { createModel } from 'hox';

function useFullPage() {
  // 元素跟踪
  const [fullPage, setFullPage] = useState(false);

  const handleFullPage = () => {
    setFullPage((s) => {
      return !s;
    });
  };

  useEffect(() => {
    const event = new Event('resize');
    window.dispatchEvent(event);
  }, [fullPage]);

  return {
    fullPage,
    handleFullPage,
  };
}

export default createModel(useFullPage);
