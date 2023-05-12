import { Typography } from 'antd';
import React from 'react';
import useViewer from '../hooks/useViewer';
const { Text } = Typography;
const ViewerMain = () => {
  const { viewerRef } = useViewer();

  return (
    <div ref={viewerRef} className="flex bg-black w-full h-full flex-1 border-sm">
      <Text>VieweThhhhhhhhhhhhhh</Text>
    </div>
  );
};

export default ViewerMain;
