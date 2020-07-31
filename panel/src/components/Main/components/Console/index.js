import React from 'react';
import { Console } from 'console-feed';

const Index = () => {
  return (
    <div
      style={{
        minWidth: 150,
        height: '100%',
        backgroundColor: '#242424',
        overflow: 'scroll',
      }}
    >
      <Console logs={[{ method: 'log', data: ['23456'] }]} variant="dark" />
    </div>
  );
};

export default Index;
