import { Typography } from 'antd';
import React from 'react';
import useViewer from '../hooks/useViewer';
import CornerstoneViewport from 'react-cornerstone-viewport';
import { imageIds, tools } from '../datas';
import initCornerstone from '../../../../utility/cornerstone';
import Check from '../hooks/Check';
import dcmImage from '../../../../assets/dcm/IMG0072.dcm';

const { Text } = Typography;
const ViewerMain = () => {
  initCornerstone();
  const { viewerRef } = useViewer();
  const imageId = 'https://rawgit.com/cornerstonejs/cornerstoneWebImageLoader/master/examples/Renal_Cell_Carcinoma.jpg';
  // const imageId2 = 'https://xolanihealth.com/images/dicom-images/IMG0073.dcm';
  const imageId3 = 'https://xolanihealth.com/images/dicom-images/covid-negative.jpeg';

  const stack = {
    imageIds: [imageId],
    currentImageIdIndex: 0,
  };
  return (
    <div ref={viewerRef} style={{ borderRadius: 8 }} className="flex bg-black w-full h-full flex-1 border-sm">
      <div id="cornerstone-element"></div>
      {/* <CornerstoneViewport tools={tools} imageIds={imageIds} style={{ minWidth: '100%', height: '512px', flex: '1' }} /> */}
      <Check stack={{ ...stack }} />
    </div>
  );
};

export default ViewerMain;
