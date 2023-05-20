import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCall from '../../hooks/useCall';
import '../../styles.css';
import { IoPersonCircle } from 'react-icons/io5';
import { Typography, Button } from 'antd';
import {
  MdOutlineMic,
  MdScreenShare,
  MdStopScreenShare,
  MdVideocam,
  MdVideocamOff,
  MdInfo,
  MdScreenshotMonitor,
  MdCall,
  MdMicOff,
  MdMaximize,
  MdFullscreen,
} from 'react-icons/md';
const { Text } = Typography;
const CallView = () => {
  const { localStream, onCall, caller, calling, remoteStream } = useSelector((state) => state.globals);

  const {
    getDeviceStream,
    localStreamRef,
    toggleMic,
    toggleVideo,
    state,
    remoteStreamRef,
    shareScreen,
    stopSharingScreen,
    maximizeRemoteVideo,
  } = useCall();
  const { audioMode, videoMode, screenMode, fullScreen } = state;
  useEffect(() => {
    if (!localStream) {
      getDeviceStream();
    }
    if (remoteStreamRef && remoteStreamRef.current) {
      remoteStreamRef.current.srcObject = remoteStream;
    }
  }, [calling, caller, remoteStream, localStream]);
  useEffect(() => {
    if (remoteStream && remoteStreamRef && remoteStreamRef.current) {
      remoteStreamRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);
  return (
    <div className="call-view-container shadow-2xl">
      <div className="call-view-inner flex flex-row gap-2">
        <div className="local-stream-container flex flex-col">
          <video
            muted={true}
            ref={localStreamRef}
            autoPlay
            playsInline
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
            }}
          />
          <div className="flex flex-row items-center justify-evenly w-full absolute bottom-2">
            <Button
              title={audioMode ? 'Mute' : 'Unmute'}
              className={`${
                audioMode ? 'text-green-500 bg-transparent' : 'text-red-500 bg-black'
              } rounded-full flex flex-col justify-center items-center w-8 h-8  border border-primary `}
              onClick={toggleMic}
            >
              {audioMode ? <MdOutlineMic size={20} /> : <MdMicOff />}
            </Button>

            <Button
              title={videoMode ? 'Turn off Camera' : 'Turn on Camera'}
              onClick={toggleVideo}
              className={`${
                videoMode ? 'text-green-500 bg-transparent' : 'text-red-500 bg-black'
              } rounded-full flex flex-col justify-center items-center w-8 h-8 border border-primary `}
            >
              {videoMode ? <MdVideocam size={20} /> : <MdVideocamOff size={20} />}
            </Button>
            {screenMode ? (
              <Button
                onClick={stopSharingScreen}
                title="Stop Sharing"
                className="rounded-full flex flex-col justify-center items-center w-8 h-8  border border-primary text-red-500 bg-black"
              >
                <MdStopScreenShare size={20} />
              </Button>
            ) : (
              <Button
                onClick={shareScreen}
                title="Share screen"
                className="rounded-full flex flex-col justify-center items-center w-8 h-8  border border-primary bg-transparent text-primary"
              >
                <MdScreenShare size={20} />
              </Button>
            )}
          </div>
        </div>
        <div className="remote-stream-container flex flex-row gap-2">
          <div className="remote-box relative flex flex-col text-gray-400 items-center gap-2 pt-4">
            {remoteStream && (
              <Button
                onClick={maximizeRemoteVideo}
                title="Full screen"
                className="rounded-md absolute right-2 top-2 flex flex-col justify-center items-center w-8 h-8  border border-primary text-primary bg-transparent z-10"
              >
                <MdFullscreen size={20} />
              </Button>
            )}
            {remoteStream ? (
              <video
                ref={remoteStreamRef}
                autoPlay
                playsInline
                style={{
                  flex: 1,
                  width: fullScreen ? '80vw' : '100%',
                  height: fullScreen ? '80vh' : '100%',
                }}
              />
            ) : (
              <>
                <IoPersonCircle size={72} />
                <Text
                  className="text-white text-lg text-center"
                  style={{ width: '200px' }}
                  ellipsis={true}
                  title="User"
                >
                  User
                </Text>
                <Text className="text-gray-400">Calling...</Text>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallView;
