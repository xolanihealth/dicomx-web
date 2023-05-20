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
    navigator.mediaDevices
      .getDisplayMedia({
        video: {
          mediaSource: 'screen',
        },
        audio: true,
      })
      .then((stream) => {
        const chunks = [];
        const mediaRecorder = new MediaRecorder(stream);
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
          stream.getTracks().forEach((track) => track.stop());
          const blob = new Blob(chunks, { type: 'video/webm' });
          //   const blob = new Blob(data, {
          //     type: data[0].type,
          //   });
          //   const time = new Date().toISOString();
          //   const fileName = `dicomx-recording-${time}.mp4`;
          //   mediaElementRef.current.src = URL.createObjectURL(blob);
          //   mediaElementRef.current.href = URL.createObjectURL(blob);
          //   mediaElementRef.current.download = fileName;
          //   const file = blobToFile(blob, fileName);
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
