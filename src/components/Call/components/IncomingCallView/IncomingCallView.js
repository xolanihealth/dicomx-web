import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { Typography, Button } from 'antd';

const { Text } = Typography;
const IncomingCallView = () => {
  return (
    <div className="incoming-call-container flex flex-row gap-2">
      <div className="incoming-call-inner flex flex-col text-gray-400 items-center gap-2 pt-4">
        <IoPersonCircle size={72} />
        <Text className="text-white text-lg text-center" style={{ width: '200px' }} ellipsis={true} title="Md. Rofiq">
          Md. Rofiq
        </Text>
        <Text className="text-gray-400">Incoming Call</Text>
      </div>
    </div>
  );
};

export default IncomingCallView;
