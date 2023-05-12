import { Typography } from 'antd';
import React from 'react';
import { MdOpenInBrowser } from 'react-icons/md';

const { Text } = Typography;
const ViewerStudy = () => {
  return (
    <div className="w-1/5 h-full border-r-1 border-primary">
      <div className="w-full flex items-center justify-center">
        <button className="flex flex-row items-center justify-center text-gray-300 p-4 gap-1">
          <MdOpenInBrowser style={{ width: 40, height: 40 }} /> <Text className="text-gray-300">OPEN STUDY</Text>
        </button>
      </div>
    </div>
  );
};

export default ViewerStudy;
