import React, { useState } from 'react';
import '../../styles.css';

import {
  MdOutlineMic,
  MdScreenShare,
  MdStopScreenShare,
  MdVideocam,
  MdInfo,
  MdScreenshotMonitor,
  MdCall,
} from 'react-icons/md';
import { BsArrowsFullscreen, BsChatLeftTextFill, BsFillRecordBtnFill, BsRecordBtn } from 'react-icons/bs';
import { FiMaximize2, FiMinimize2, FiPhoneCall } from 'react-icons/fi';
import { Button, Tooltip, Typography } from 'antd';
const { Text } = Typography;
const ControlPanel = () => {
  const [minimized, setMinimized] = useState(false);
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  return minimized ? (
    <Button title="Maximize panel" onClick={toggleMinimized} className="maximize-btn">
      <BsArrowsFullscreen className="text-gray-500 hover:text-primary mb-1" size={24} />
      <Text className="text-xs hover:text-primary"> On a Call...</Text>
      {/* <MdCall size={32} /> */}
    </Button>
  ) : (
    <div className="control-panel-body">
      <Button onClick={toggleMinimized} title="Minimize panel" className="absolute right-0 top-0 w-8 h-7 p-1 bg-white">
        <FiMinimize2 size={18} />
      </Button>

      <Button
        title="Meeting Info"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-blue-500 border-0"
      >
        <MdInfo size={26} />
      </Button>

      <Button
        title="Mute"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-white bg-green-600 border-0"
      >
        <MdOutlineMic size={26} />
      </Button>

      <Button
        title="Turn off Camera"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-white bg-green-600 border-0"
      >
        <MdVideocam size={26} />
      </Button>

      <Button
        title="Stop Sharing"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-red-500 border-0"
      >
        <MdStopScreenShare size={26} />
      </Button>
      <Button
        title="Record Screen"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-gray-600 border-0"
      >
        <BsRecordBtn size={26} />
      </Button>

      <Button
        title="Take Screenshot"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-gray-600 border-0"
      >
        <MdScreenshotMonitor size={26} />
      </Button>
      <Button
        title="Conversations"
        className="rounded-full flex flex-col justify-center items-center w-12 h-12 text-blue-900 border-0"
      >
        <BsChatLeftTextFill size={26} />
      </Button>
    </div>
  );
};

export default ControlPanel;
