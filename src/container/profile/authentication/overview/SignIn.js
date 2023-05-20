import React, { useState, useCallback } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, Dropdown, Menu, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSVG } from 'react-svg';
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';
import { Auth0Lock } from 'auth0-lock';
import { login } from '../../../../redux/authentication/actionCreator';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { auth0options } from '../../../../config/auth0';
import axios from 'axios';
import { getItem } from '../../../../utility/localStorageControl';
import Cookies from 'js-cookie';
import actions from '../../../../redux/authentication/actions';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function SignIn() {
  const history = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.auth.loading);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    checked: null,
  });

  const lock = new Auth0Lock(clientId, domain, auth0options);
  const client = axios.create({
    baseURL: 'https://xolanihealth.cloud',
    headers: {
      Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  const handleSubmit = useCallback(
    (values) => {
      dispatch(actions.loginBegin());
      client
        .post('/login', { ...values, rememberMeCheckbox: true })
        .then(({ data }) => {
          Cookies.set('access_token', data.token);
          Cookies.set('userId', data.user);
          Cookies.set('logedIn', true);
          dispatch(actions.loginSuccess(true));
          history('/admin');
        })
        .catch((error) => {
          console.log(error.response.data.message);
          message.error(error.response.data.message);
          dispatch(actions.loginErr(error.response.data.message));
        })
        .finally(() => {});
    },
    [history, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  lock.on('authenticated', (authResult) => {
    lock.getUserInfo(authResult.accessToken, (error) => {
      if (error) {
        return;
      }

      handleSubmit();
      lock.hide();
    });
  });
  // const signupMenu = (
  //   <Menu className="flex flex-col justify-center items-center gap-1">
  //     <Menu.Item onClick={() => history('register/radiologist')} className="w-full">
  //       a Radiologist
  //     </Menu.Item>
  //     <Menu.Item onClick={() => history('register/institution')} className="w-full">
  //       an Institution
  //     </Menu.Item>
  //   </Menu>
  // );
  return (
    <Row justify="center">
      <Col xxl={6} xl={8} md={12} sm={18} xs={24}>
        <div className="mt-3 bg-white rounded-lg dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87 text-primary">Sign In</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
              <Form.Item
                name="email"
                rules={[{ message: 'Please input your username or Email!', required: true }]}
                initialValue="ninjadash@dm.com"
                label="Username or Email Address"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
              >
                <Input placeholder="name@example.com" />
              </Form.Item>
              <Form.Item
                name="password"
                initialValue="123456"
                label="Password"
                className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <Checkbox onChange={onChange} checked={state.checked} className="text-xs text-light dark:text-white60">
                  Keep me logged in
                </Checkbox>
                <NavLink className=" text-primary text-13" to="/forgotPassword">
                  Forgot password?
                </NavLink>
              </div>
              <Form.Item>
                <Button
                  className="w-full h-12 p-0 my-6 text-sm font-medium text-white border-none"
                  style={{ backgroundColor: '#0796a7' }}
                  htmlType="submit"
                  size="large"
                >
                  {isLoading ? 'Loading...' : 'Sign In'}
                </Button>
              </Form.Item>
              <div className="flex flex-wrap justify-center"></div>
            </Form>
          </div>
          <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md flex flex-row justify-center items-center gap-2">
            <p className="text-sm font-medium text-body dark:text-white60">Don`t have an account?</p>
            <p className="text-primary text-sm cursor-pointer" onClick={() => history('register/radiologist')}>
              Sign up
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SignIn;
