import React from 'react';
import { Console } from 'console-feed';
import useConsoleModel from '../../../../models/console';

const Index = () => {
  const { consoleData } = useConsoleModel();

  return (
    <div
      style={{
        minWidth: 150,
        height: '100%',
        backgroundColor: '#242424',
        overflow: 'scroll',
      }}
    >
      <Console logs={consoleData} variant="dark" />
    </div>
  );
};

export default Index;
