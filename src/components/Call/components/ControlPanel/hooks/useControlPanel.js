import React, { createRef, useReducer, useRef } from 'react';
import { blobToFile, getFileExtFromBase64 } from '../../../../../utility/utility';
import { useScreenshot } from 'use-react-screenshot';
import { message } from 'antd';
const useControlPanel = () => {
  const mediaElementRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const screenshotRef = useRef(null);
  const [image, takeScreenshot] = useScreenshot();
  const initialState = {
    dataStream: [],
    recording: false,
    videoFile: null,
    imageFile: image,
  };

  const [state, dispatch] = useReducer((newState, value) => ({ ...newState, ...value }), { initialState });
  const onStartScreenRecording = async () => {
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          chromeMediaSource: 'screen',
          mediaSource: 'screen',
        },
        audio: true,
      })
      .then((stream) => {
        const chunks = [];

        let mediaStream;
        if (!audioStream || audioStream === 'unavailable') {
          mediaStream = stream;
        } else {
          mediaStream = new MediaStream([...stream.getVideoTracks(), ...audioStream.getAudioTracks()]);
        }

        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
          dispatch({ dataStream: [e.data] });
        };

        mediaRecorder.start();
        mediaRecorder.onstart = () => {
          dispatch({ recording: true });
        };

        mediaRecorder.onstop = () => {
          dispatch({ recording: false });
          mediaStream.getTracks().forEach((track) => track.stop());
          const blob = new Blob(chunks, { type: 'video/webm' });
          dispatch({ videoFile: blob });
        };
      });
  };
  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
  };

  const handleScreenshot = () => {
    const appLayout = document.querySelector('#app-layout');
    takeScreenshot(appLayout)
      .then((result) => {
        dispatch({ imageFile: result });
        message.success('Screen shot captured!');
      })
      .catch((error) => message.error(error.message));
  };

  const downloadScreenshot = () => {
    const fileExt = getFileExtFromBase64(state.imageFile);
    const time = new Date().toISOString();
    const fileName = `dicomx-screenshot-${time}.${fileExt}`;
    const link = document.createElement('a');
    link.href = state.imageFile;
    link.download = fileName;
    link.click();
    dispatch({ imageFile: null });
  };

  const removeFile = () => {
    dispatch({ videoFile: null });
    dispatch({ imageFile: null });
  };
  return {
    state,
    onStartScreenRecording,
    mediaElementRef,
    removeFile,
    handleStopRecording,
    handleScreenshot,
    screenshotRef,
    downloadScreenshot,
  };
};

export default useControlPanel;
