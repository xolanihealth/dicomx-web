import { message } from 'antd';
import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  setIncomingCall,
  setLocalStream,
  setOnCall,
  setOutgoingCall,
  setRemoteStream,
} from '../../../redux/globals/actions';

const useCall = () => {
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const myAudioTrack = useRef(null);
  const myVideoTrack = useRef(null);
  const myScreenTrack = useRef(null);
  const { localStream, onCall, caller, calling, peer, remotePeer, incomingCall, remoteStream, outgoingCall } =
    useSelector((state) => state.globals);
  const initialState = {
    audioMode: true,
    videoMode: true,
    screenMode: false,
    fullScreen: false,
  };

  const [state, dispatch] = useReducer((prevState, value) => ({ ...prevState, ...value }), { initialState });

  const reduxDispatcher = useDispatch();
  useEffect(() => {}, [myVideoTrack, myAudioTrack]);

  const getDeviceStream = (type) => {
    let streamConfig;
    switch (type) {
      case 'video':
        streamConfig = { video: true, audio: true };
      case 'audio':
        streamConfig = { video: false, audio: true };
      default:
        streamConfig = { video: true, audio: true };
    }

    try {
      if (!navigator?.mediaDevices) {
        reduxDispatcher(setOnCall(false));
        message.info("Ensure you have enabled your device's microphone and camera");
        return false;
      }
      navigator.mediaDevices.enumerateDevices().then((srcInfos) => {
        navigator.mediaDevices
          .getUserMedia(streamConfig)
          .then((deviceStream) => {
            myAudioTrack.current = deviceStream.getAudioTracks();
            myVideoTrack.current = deviceStream.getVideoTracks();
            dispatch({ audioMode: deviceStream.getAudioTracks()[0].enabled });
            dispatch({ videoMode: deviceStream.getVideoTracks()[0].enabled });

            reduxDispatcher(setLocalStream(deviceStream));

            localStreamRef.current.srcObject = deviceStream;

            if (caller) {
              const call = peer.call(remotePeer, deviceStream, {
                metadata: JSON.stringify({
                  user: {},
                }),
              });
              reduxDispatcher(setOutgoingCall(call));

              call.on('stream', (rStream) => {
                reduxDispatcher(setRemoteStream(rStream));
              });
            } else {
              incomingCall.answer(deviceStream);
              incomingCall.on('stream', (rStream) => {
                reduxDispatcher(setRemoteStream(rStream));
              });
            }
          })
          .catch((err) => {
            toast.error(err.message);
          });
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  const toggleMic = () => {
    myAudioTrack.current[0].enabled = !myAudioTrack.current[0].enabled;
    dispatch({ audioMode: myAudioTrack.current[0].enabled });
  };

  const toggleVideo = () => {
    myVideoTrack.current[0].enabled = !myVideoTrack.current[0].enabled;
    dispatch({ videoMode: myVideoTrack.current[0].enabled });
  };

  const stopSharingScreen = () => {
    localStreamRef.current.srcObject = localStream;
    const callPeer = incomingCall ? incomingCall.peerConnection : outgoingCall.peerConnection;
    let sender = callPeer.getSenders().find((s) => s.track.kind == myScreenTrack.current[0].kind);

    //replace the video track i was sharing with my peers
    sender.replaceTrack(myVideoTrack.current[0]);
    dispatch({ screenMode: false });
  };

  const shareScreen = () => {
    const callPeer = incomingCall ? incomingCall.peerConnection : outgoingCall.peerConnection;
    if (state.screenMode) {
      stopSharingScreen();
    } else {
      navigator.mediaDevices
        .getDisplayMedia({
          video: {
            cursor: 'always',
          },
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
          },
        })
        .then((stream) => {
          myScreenTrack.current = stream.getVideoTracks();
          dispatch({ screenMode: stream.getVideoTracks()[0].enabled });

          localStreamRef.current.srcObject = stream;

          stream.getVideoTracks()[0].onended = () => stopSharingScreen();
          let sender = callPeer.getSenders().find((s) => s.track.kind == stream.getVideoTracks()[0].kind);

          sender.replaceTrack(stream.getVideoTracks()[0]);
        })
        .catch((err) => {});
    }
  };

  const maximizeRemoteVideo = () => {
    if (remoteStreamRef.current?.requestFullscreen) {
      remoteStreamRef.current?.requestFullscreen();
    } else if (remoteStreamRef.current?.msRequestFullscreen) {
      remoteStreamRef.current?.msRequestFullscreen();
    } else if (remoteStreamRef.current?.mozRequestFullScreen) {
      remoteStreamRef.current?.mozRequestFullScreen();
    } else if (remoteStreamRef.current?.webkitRequestFullscreen) {
      remoteStreamRef.current?.webkitRequestFullscreen();
    }
  };

  const endCall = () => {
    myVideoTrack.current?.forEach((track) => track?.stop());
    myAudioTrack.current?.forEach((track) => track?.stop());
    myScreenTrack.current?.forEach((track) => track?.stop());
    reduxDispatcher(setOnCall(false));
    reduxDispatcher(setIncomingCall(null));
    reduxDispatcher(setOutgoingCall(null));

    reduxDispatcher(setLocalStream(null));
    localStreamRef.current = null;
  };
  return {
    localStreamRef,
    getDeviceStream,
    toggleMic,
    toggleVideo,
    state,
    endCall,
    myVideoTrack,
    myAudioTrack,
    remoteStreamRef,
    shareScreen,
    stopSharingScreen,
    maximizeRemoteVideo,
  };
};

export default useCall;
