import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCaller, setCalling, setDrawer, setOnCall, setRemotePeer } from '../../../redux/globals/actions';
import { setContacts } from '../../../redux/users/actions';
import { getItem } from '../../../utility/localStorageControl';

const useContacts = () => {
  const contacts = useSelector((state) => state.user.contacts);
  const { socket, peer } = useSelector((state) => state.globals);
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
    socket.emit('call', userId, ({ status, data }) => {
      console.log(' status ==>>', status);
      console.log(' data ==>>', data);

      if (!status) {
        message.error('Something went wrong');
      }
      if (data.peerId) {
        dispatch(setRemotePeer(data.peerId.peerId));
        try {
          if (!peer) {
            console.log('no local peer');
          } else {
            dispatch(setCalling(true));

            dispatch(setCaller(true));
            peer.on('error', (err) => {
              console.log(err);
            });
            dispatch(setOnCall(true));
            dispatch(setDrawer(false));
          }
        } catch (error) {
          message.error(error?.message);
        }
      }
    });
  };

  // if (call) {
  //   // InCallManager.start({
  //   //   media: callType == "voice" ? "audio" : "video",
  //   //   ringback: "_DTMF_",
  //   // });
  //   // InCallManager.setForceSpeakerphoneOn(true);
  //   call.on("error", (err = new Error()) => {
  //     console.log(err.message, "on call error");
  //   });
  //   setCalling(true);
  //   setOutgoingCall(call);
  //   setCaller(true);
  //   call.on("stream", (rStream) => {
  //     //   InCallManager.stopRingback();

  //     setOnCall(true);
  //     setCalling(false);
  //     setRemoteStream(rStream);
  //     remoteStreamRef.current.srcObject = rStream;
  //   });

  //   call.on("close", () => {
  //     endCall(call);
  //     console.log("Call should end");
  //   });
  // } else {
  //   toast.error(t("unableToCall"));
  //   goBack();
  // }
  return { getContacts, contacts, onCallUser };
};

export default useContacts;
