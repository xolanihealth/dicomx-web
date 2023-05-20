import { Typography } from 'antd';
import React from 'react';
import useViewer from '../hooks/useViewer';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';

const { Text } = Typography;
const ViewerMain = () => {
  const { csElementRef, onDropFiles } = useViewer();
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: onDropFiles,
    noClick: true,
    noKeyboard: true,
    accept: { 'application/*': ['.dcm'] },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <div style={{ borderRadius: 8, height: 'calc(100vh - 110px)' }} className="flex bg-black w-full  border-sm">
      <div
        {...getRootProps({
          ref: csElementRef,
          id: 'cornerstone-element',
          dataIndex: '0',
          onContextMenu: 'return false',
        })}
        className="flex-col w-full h-full flex  items-center justify-center relative "
      >
        <input {...getInputProps()} />
        {isDragActive && <p className=" text-gray-500 absolute">Drop file(s) here</p>}
      </div>
    </div>
  );
};

export default ViewerMain;
