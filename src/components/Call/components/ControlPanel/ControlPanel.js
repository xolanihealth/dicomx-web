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
    <Button title="Maximize panel" onClick={toggleMinimized} className="maximize-btn p-1 border-0">
      <BsArrowsFullscreen className="text-black" size={25} />
      <Text className="text-xs text-black truncate">On a call</Text>
    </Button>
  ) : (
    <div className="control-panel-body shadow-2xl">
      <Button
        onClick={toggleMinimized}
        title="Minimize panel"
        className="absolute rounded-full right-0 top-0 w-7 h-7 p-1 bg-primary border-0"
      >
        <FiMinimize2 size={15} />
      </Button>

      <Button
        title="Meeting Info"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdInfo size={20} />
      </Button>

      <Button
        title="Mute"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdOutlineMic size={20} />
      </Button>

      <Button
        title="Turn off Camera"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdVideocam size={20} />
      </Button>

      <Button
        title="Stop Sharing"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdStopScreenShare size={20} />
      </Button>
      <Button
        title="Record Screen"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <BsRecordBtn size={20} />
      </Button>

      <Button
        title="Take Screenshot"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdScreenshotMonitor size={20} />
      </Button>
      <Button
        title="Conversations"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <BsChatLeftTextFill size={20} />
      </Button>
    </div>
  );
};

export default ControlPanel;
