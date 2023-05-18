import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, setOnCall } from '../../../redux/globals/actions';
import { setContacts } from '../../../redux/users/actions';
import { getItem } from '../../../utility/localStorageControl';

const useContacts = () => {
  const contacts = useSelector((state) => state.user.contacts);
  const { socket } = useSelector((state) => state.globals);
  const dispatch = useDispatch();
  const client = axios.create({
    baseURL: 'https://xolanihealth.cloud',
    headers: {
      Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
  const userId = getItem('userId');
  const getContacts = () => {
    client
      .get(`/get-contacts`)
      .then(({ data }) => {
        dispatch(setContacts(data?.result));
      })
      .catch((error) => console.log(error))
      .finally(() => {});
  };

  const onCallUser = (userId) => {
    console.log(userId);
    dispatch(setDrawer(false));
    dispatch(setOnCall(true));
    socket.emit('call', userId, ({ status, data }) => {
      if (!status) {
        message.error(t('somethingHappen'));
        goBack();
      }
      if (data.peerId) {
        // try {
        //   setOnCall(true)
        //   if (!localPeer) {
        //     console.log("no local peer");
        //     goBack();
        //   } else {
        //     localPeer.on("error", (err) => {
        //       console.log(err);
        //       // if (!err.message.includes("Could not connect to peer")) {
        //       //   toast.err(err.message);
        //       //   goBack();
        //       // }
        //     });
        //   }
        //   const call = localPeer.call(data.peer_id, localStream, {
        //     metadata: JSON.stringify({
        //       user: myData,
        //       callType: callType,
        //     }),
        //   });
        //   if (call) {
        //     call.on("error", (err = new Error()) => {
        //       console.log(err.message, "on call error");
        //     });
        //     setCalling(true);
        //     setOutgoingCall(call);
        //     setCaller(true);
        //     call.on("stream", (rStream) => {
        //       //   InCallManager.stopRingback();
        //       setOnCall(true);
        //       setCalling(false);
        //       setRemoteStream(rStream);
        //       remoteStreamRef.current.srcObject = rStream;
        //     });
        //     call.on("close", () => {
        //       endCall(call);
        //       console.log("Call should end");
        //     });
        //   } else {
        //     toast.error(t("unableToCall"));
        //     goBack();
        //   }
        // } catch (error) {
        //   toast.error(error?.message);
        // }
      }
    });
  };
  return { getContacts, contacts, onCallUser };
};

export default useContacts;
