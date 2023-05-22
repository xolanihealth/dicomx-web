import { message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStudies } from '../../../redux/studies/actions';
import { getItem } from '../../../utility/localStorageControl';

const useStudies = () => {
  const studies = useSelector((state) => state.studies.studies);
  const dispatch = useDispatch();
  const client = axios.create({
    baseURL: 'https://xolanihealth.cloud',
    headers: {
      Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  const userId = getItem('userId');
  const getStudies = () => {
    client
      .get(`/get-studies/${userId}`)
      .then(({ data }) => {
        dispatch(setStudies(data?.result));
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {});
  };

  return { getStudies, studies };
};

export default useStudies;
