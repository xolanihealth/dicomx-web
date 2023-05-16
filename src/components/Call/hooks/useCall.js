import React, { useEffect, useReducer, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { setLocalStream, setOnCall } from '../../../redux/globals/actions';

const useCall = () => {
  const localStreamRef = useRef(null);
  const myAudioTrack = useRef(null);
  const myVideoTrack = useRef(null);
  const [tracks, setTracks] = useState(null);

  const initialState = {
    audioMode: true,
    videoMode: true,
    screenShare: false,
  };

  const [state, dispatch] = useReducer((prevState, value) => ({ ...prevState, ...value }), { initialState });

  const reduxDispatcher = useDispatch();
  useEffect(() => {}, [myVideoTrack, myAudioTrack]);

  const getDeviceStream = () => {
    try {
      navigator.mediaDevices.enumerateDevices().then((srcInfos) => {
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((deviceStream) => {
            myAudioTrack.current = deviceStream.getAudioTracks();
            myVideoTrack.current = deviceStream.getVideoTracks();
            setTracks(deviceStream.getTracks());
            dispatch({ audioMode: deviceStream.getAudioTracks()[0].enabled });
            dispatch({ videoMode: deviceStream.getVideoTracks()[0].enabled });
            reduxDispatcher(setLocalStream(deviceStream));

            localStreamRef.current.srcObject = deviceStream;
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
    if (myAudioTrack.current[0].enabled) {
      myAudioTrack.current[0].enabled = false;
    } else {
      myAudioTrack.current[0].enabled = true;
      // audioMode = true;
    }
    dispatch({ audioMode: myAudioTrack.current[0]?.enabled });
  };

  const toggleVideo = () => {
    if (myVideoTrack.current[0]?.enabled) {
      myVideoTrack.current[0].enabled = false;
    } else {
      myVideoTrack.current[0].enabled = true;
    }
    dispatch({ videoMode: myVideoTrack.current[0]?.enabled });
  };

  const endCall = () => {
    tracks?.forEach((track) => track.stop());

    reduxDispatcher(setOnCall(false));
    reduxDispatcher(setLocalStream(null));
    localStreamRef.current = null;
  };
  return { localStreamRef, getDeviceStream, toggleMic, toggleVideo, state, endCall, myVideoTrack, myAudioTrack };
};

export default useCall;
