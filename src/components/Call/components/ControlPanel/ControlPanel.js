import React, { useState } from 'react';
import '../../styles.css';

import { MdScreenshotMonitor, MdPhoneDisabled, MdCancel, MdDownload } from 'react-icons/md';
import { BsArrowsFullscreen, BsChatLeftTextFill, BsRecordBtn } from 'react-icons/bs';
import { Button, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useCall from '../../hooks/useCall';
import useControlPanel from './hooks/useControlPanel';
const { Text } = Typography;
const ControlPanel = () => {
  const [minimized, setMinimized] = useState(false);
  const { onCall } = useSelector((state) => state.globals);
  const dispatch = useDispatch();
  const toggleMinimized = () => {
    setMinimized(!minimized);
  };
  const { endCall } = useCall();
  const {
    state,
    onStartScreenRecording,
    mediaElementRef,
    removeFile,
    handleStopRecording,
    image,
    handleScreenshot,
    screenshotRef,
    downloadScreenshot,
  } = useControlPanel();

  return (
    <>
      <div className="media-element">
        {state.imageFile && (
          <MdDownload
            title="Download"
            onClick={downloadScreenshot}
            size={20}
            className="absolute z-20 bottom-3 right-3 rounded-full cursor-pointer border text-green-500 bg-gray-700"
          />
        )}
        {(state.imageFile || state.videoFile) && (
          <MdCancel
            title="Remove"
            onClick={removeFile}
            size={16}
            className="text-red-500 absolute z-20 -top-3 -right-3 rounded-full cursor-pointer "
          />
        )}

        {state.videoFile && (
          <video width="100%" height="100%" className="border-primary border" ref={mediaElementRef} controls>
            <source src={URL.createObjectURL(state.videoFile)} type="video/mp4" />
          </video>
        )}
        {state.imageFile && <img width="100%" height="100%" className="border-primary border" src={state.imageFile} />}
      </div>

      <div className="control-panel-body shadow-2xl">
        {state.recording && <Text className="absolute -top-4 left-2 text-xs">Recording...</Text>}

        {state.recording ? (
          <Button
            title="Stop Recording"
            className="recording-btn rounded-full flex flex-col justify-center items-center w-8 h-8 text-green-500 border border-green-500"
            onClick={handleStopRecording}
          >
            <BsRecordBtn size={20} />
          </Button>
        ) : (
          <Button
            title="Record Screen"
            className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary border-0"
            onClick={onStartScreenRecording}
          >
            <BsRecordBtn size={20} />
          </Button>
        )}

        <Button
          onClick={handleScreenshot}
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
    </>
  );
};

export default ControlPanel;
