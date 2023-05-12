import { Typography } from 'antd';
import React from 'react';
import useViewer from '../hooks/useViewer';
import CornerstoneViewport from 'react-cornerstone-viewport';
import { imageIds, tools } from '../datas';
import initCornerstone from '../../../../utility/cornerstone';
initCornerstone();
const { Text } = Typography;
const ViewerMain = () => {
  const { viewerRef } = useViewer();

  return (
    <div ref={viewerRef} style={{ borderRadius: 8 }} className="flex bg-black w-full h-full flex-1 border-sm">
      <div id="cornerstone-element"></div>
      <CornerstoneViewport tools={tools} imageIds={imageIds} style={{ minWidth: '100%', height: '512px', flex: '1' }} />
    </div>
  );
};

export default ViewerMain;
