import { useState } from 'react';
import { createModel } from 'hox';

function useShowTips() {
  const [isShowTips, setIsShowTips] = useState(false);

  return {
    isShowTips,
    setIsShowTips,
  };
}

export default createModel(useShowTips);
