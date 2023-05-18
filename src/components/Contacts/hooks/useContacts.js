import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setContacts } from '../../../redux/users/actions';
import { getItem } from '../../../utility/localStorageControl';

const useContacts = () => {
  const contacts = useSelector((state) => state.user.contacts);
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
  return { getContacts, contacts };
};

export default useContacts;
