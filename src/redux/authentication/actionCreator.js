import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import actions from './actions';
import { DataService } from '../../config/dataService/dataService';

const { loginBegin, loginSuccess, loginErr, logoutBegin, logoutSuccess, logoutErr } = actions;

const login = (values, callback) => {
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post('/login', values);
      if (response.data.errors) {
        dispatch(loginErr(response.data.errors));
      } else {
        Cookies.set('access_token', response.data.data.token);
        Cookies.set('logedIn', true);
        dispatch(loginSuccess(true));
        callback();
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const register = (values, url, callback) => {
  console.log(url);
  return async (dispatch) => {
    dispatch(loginBegin());
    try {
      const response = await DataService.post(`/signup${url}`, values);
      console.log('response data ==>', response);
      if (response.data.errors) {
        console.log('Response error', response.data.errors);
        dispatch(loginErr('Registration failed!'));
      } else {
        console.log('Response data', response.data);
        Cookies.set('logedIn', true);
        dispatch(loginSuccess(true));
        callback();
      }
    } catch (err) {
      dispatch(loginErr(err));
    }
  };
};

const logOut = (callback) => {
  return async (dispatch) => {
    dispatch(logoutBegin());
    try {
      Cookies.remove('logedIn');
      Cookies.remove('access_token');
      dispatch(logoutSuccess(false));
      callback();
    } catch (err) {
      dispatch(logoutErr(err));
    }
  };
};

export { login, logOut, register };
