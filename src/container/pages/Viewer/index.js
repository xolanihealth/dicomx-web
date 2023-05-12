import { Typography } from 'antd';
import React from 'react';
import ViewerHeader from './components/ViewerHeader';
import ViewerMain from './components/ViewerMain';
import ViewerStudy from './components/ViewerStudy';
const index = () => {
  return (
    <div className="w-full flex flex-row" style={{ height: `calc(100vh - 56px)`, backgroundColor: '#27272b' }}>
      <ViewerStudy />
      <div className="w-4/5">
        <ViewerHeader />
        <ViewerMain />
      </div>
    </div>
  );
};

export default index;
