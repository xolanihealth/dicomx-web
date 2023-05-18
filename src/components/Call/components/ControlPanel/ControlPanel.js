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
  MdPhoneEnabled,
  MdPhoneDisabled,
} from 'react-icons/md';
import { BsArrowsFullscreen, BsChatLeftTextFill, BsFillRecordBtnFill, BsRecordBtn } from 'react-icons/bs';
import { FiMaximize2, FiMinimize2, FiPhoneCall } from 'react-icons/fi';
import { Button, Tooltip, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, setDrawerChildren, setOnCall } from '../../../../redux/globals/actions';
import Contacts from '../../../Contacts';
import useCall from '../../hooks/useCall';
const { Text } = Typography;
const ControlPanel = () => {
  const [minimized, setMinimized] = useState(false);
  const { onCall } = useSelector((state) => state.globals);
  const dispatch = useDispatch();
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  const { endCall } = useCall();
  return minimized ? (
    <Button title="Maximize panel" onClick={toggleMinimized} className="maximize-btn p-1 border-0 bg-green-500">
      <BsArrowsFullscreen className="text-black" size={25} />
      <Text className="text-xs text-black truncate">Maximize</Text>
    </Button>
  ) : (
    <div className="control-panel-body shadow-2xl">
      <Button
        onClick={toggleMinimized}
        title="Minimize panel"
        className="absolute rounded-full right-0 top-0 w-5 h-5 p-1 bg-primary border-0"
      >
        <FiMinimize2 size={10} />
      </Button>

      {/* <Button
        title="Meeting Info"
        className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
      >
        <MdInfo size={20} />
      </Button> */}

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
      {onCall && (
        <Button
          onClick={() => endCall()}
          title="End Call"
          className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-red-500 border-0"
        >
          <MdPhoneDisabled color="white" size={20} />
        </Button>
      )}
    </div>
  );
};

export default ControlPanel;
