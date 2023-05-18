import React from 'react';
import { IoPersonCircle } from 'react-icons/io5';
import { Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setCaller, setCalling, setIncomingCall, setOnCall, togglePopup } from '../../../../redux/globals/actions';
import { MdPhoneDisabled, MdPhoneEnabled } from 'react-icons/md';

const { Text } = Typography;
const IncomingCallView = () => {
  const { incomingCall } = useSelector((state) => state.globals);
  const dispatch = useDispatch();
  const onAnswerCall = () => {
    dispatch(togglePopup(false));
    dispatch(setOnCall(true));
  };

  const onRejectCall = () => {
    incomingCall?.close();
    dispatch(setOnCall(false));
    dispatch(setCalling(false));
    dispatch(setIncomingCall(null));
    dispatch(setCaller(false));
  };

  return (
    <div className="incoming-call-container flex flex-row gap-2">
      <div className="incoming-call-inner flex flex-col text-gray-400 items-center gap-2 pt-4">
        <IoPersonCircle size={72} />
        <Text className="text-white text-lg text-center" style={{ width: '200px' }} ellipsis={true} title="User">
          User
        </Text>
        <Text className="text-gray-400">Incoming Call</Text>
        <div className="flex gap-6 my-2 top-right-wrap">
          <Button
            onClick={() => onAnswerCall()}
            title="Answer Call"
            className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-green-500 border-0 text-white"
          >
            <MdPhoneEnabled size={20} />
          </Button>
          <Button
            onClick={() => onRejectCall()}
            title="Reject Call"
            className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-red-500 text-white border-0"
          >
            <MdPhoneDisabled color="white" size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IncomingCallView;
