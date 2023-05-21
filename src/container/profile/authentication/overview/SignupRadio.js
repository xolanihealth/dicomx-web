import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button, Select, Collapse, Switch, DatePicker, Upload, Radio, message } from 'antd';

import { useDispatch, useSelector } from 'react-redux';
import { AuthFormWrap } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import axios from 'axios';
import { getItem } from '../../../../utility/localStorageControl';
import Cookies from 'js-cookie';
import actions from '../../../../redux/authentication/actions';

function SignUpRadio() {
  const dispatch = useDispatch();
  const history = useNavigate();
  let isLoading = useSelector((state) => state.auth.loading);

  const [state, setState] = useState({
    values: null,
    checked: null,
    checkData: [],
  });

  // const lock = new Auth0Lock(clientId, domain, auth0options);
  const client = axios.create({
    baseURL: 'https://xolanihealth.cloud',
    headers: {
      Authorization: `Bearer ${getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });

  const handlePractitioners = useCallback(
    (values) => {
      dispatch(actions.loginBegin());
      client
        .post('/signup/practitioners', { ...values })
        .then(({ data }) => {
          Cookies.set('access_token', data.token);
          Cookies.set('userId', data.user);
          Cookies.set('logedIn', true);
          dispatch(actions.loginSuccess(true));
          history('/admin');
        })
        .catch((error) => {
          const errorMessage = Object.values(error.response.data.errors)[0];
          message.error(errorMessage);
          isLoading = false;
          dispatch(actions.loginErr(error.response.data.errors));
        })
        .finally(() => {});
    },
    [history, dispatch],
  );

  const handleInstitution = useCallback(
    (values) => {
      dispatch(actions.loginBegin());
      client
        .post('/signup/hospitals', { ...values })
        .then(({ data }) => {
          Cookies.set('access_token', data.token);
          Cookies.set('userId', data.user);
          Cookies.set('logedIn', true);
          dispatch(actions.loginSuccess(true));
          history('/admin');
        })
        .catch((error) => {
          const errorMessage = Object.values(error.response.data.errors)[0];
          message.error(errorMessage);
          isLoading = false;
          dispatch(actions.loginErr(error.response.data.errors));
        })
        .finally(() => {});
    },
    [history, dispatch],
  );

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  const multipleChange = (childData) => {
    setState({ ...state, checkData: childData });
  };

  const [isInterpreter, setIsInterPreter] = useState(false);

  const toggleIsInterpreter = () => {
    setIsInterPreter(!isInterpreter);
  };

  const props = {
    name: 'file',
    beforeUpload: () => false,
  };
  const [form, setPage] = useState('radiologist');
  return (
    <Row justify="center">
      <Col xxl={15} xl={16} md={18} sm={22} xs={24}>
        <Row justify="center">
          <Radio.Group value={form} onChange={(e) => setPage(e.target.value)}>
            <Radio.Button value="radiologist" type="primary" size="large" className="text-black">
              Radiologist
            </Radio.Button>
            <Radio.Button value="institution" type="primary" size="large" className="text-black">
              Institution
            </Radio.Button>
          </Radio.Group>
        </Row>
        {(form === 'radiologist' && (
          <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
            <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
              <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Radiologist sign up</h2>
            </div>
            <div className="px-10 pt-8 pb-6">
              <Form name="register" onFinish={handlePractitioners} layout="vertical">
                <div className="mb-4">
                  <div className="flex flex-row w-full gap-2 justify-between items-center">
                    <Form.Item
                      label="First name"
                      name="practitionerFirstName"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                      rules={[{ required: true, message: 'Please input your first name!' }]}
                    >
                      <Input placeholder="First name" />
                    </Form.Item>
                    <Form.Item
                      label="Last name"
                      name="practitionerLastName"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                      rules={[{ required: true, message: 'Please input your last name!' }]}
                    >
                      <Input placeholder="Last name" />
                    </Form.Item>
                  </div>
                  <div className="flex flex-row w-full gap-2 justify-between items-center">
                    <Form.Item
                      label="Password"
                      name="practitionerPassword"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                      rules={[{ required: true, message: 'Please input your password!', type: 'password' }]}
                    >
                      <Input.Password placeholder="**********" />
                    </Form.Item>
                    <Form.Item
                      label="Confirm password"
                      name="cfmpractitionerPassword"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                      rules={[{ required: true, message: 'Please confirm your password!', type: 'password' }]}
                    >
                      <Input.Password placeholder="**********" />
                    </Form.Item>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-row w-full gap-2 justify-between items-center">
                    <Form.Item
                      name="practitionerEmail"
                      label="Email address"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                      rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                      <Input placeholder="name@example.com" />
                    </Form.Item>
                    <Form.Item
                      label="Phone number"
                      name="practitionerPhone"
                      className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                    >
                      <Input placeholder="Phone number" />
                    </Form.Item>
                  </div>
                  <div className="flex flex-row w-full gap-2 justify-between items-center">
                    <Form.Item
                      className="w-1/2"
                      label="Country"
                      name="practitionerCountry"
                      rules={[{ required: true, message: 'Please select your country!' }]}
                    >
                      <Select>
                        <Select.Option value="NG">Nigeria</Select.Option>
                        <Select.Option value="IL">Israel</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      className="w-1/2"
                      label="City"
                      name="practitionerCity"
                      rules={[{ required: true, message: 'Please select your city!' }]}
                    >
                      <Select>
                        <Select.Option value="FCT">Federal Capital Territory</Select.Option>
                        <Select.Option value="TLV">Tel Aviv</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex flex-row items-center gap-2">
                    <div className="text-primary">Do you interprete images?</div>
                    <Switch onChange={toggleIsInterpreter} />
                  </div>
                  {isInterpreter && (
                    <>
                      <div className="flex flex-row w-full gap-2 justify-between items-center">
                        <Form.Item
                          label="Upload CV"
                          name="cv"
                          className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                          rules={[{ required: false, message: 'Please upload your CV!' }]}
                        >
                          <Upload
                            {...props}
                            // onChange={(e) => onChange(e, "cacCert")}
                            style={{ width: '100%', position: 'relative' }}
                          >
                            <Button
                              style={{ borderRadius: 2, width: '100%', whiteSpace: 'nowrap', color: 'gray' }}
                              // icon={<UploadOutlined style={{ margin: "0 10px" }} />}
                            >
                              Upload CV
                            </Button>
                          </Upload>
                        </Form.Item>
                        <Form.Item
                          className="w-1/2"
                          label="When did you start practicing?"
                          name="practice_date"
                          rules={[{ required: false, message: 'Please select a valid date' }]}
                        >
                          <DatePicker className="w-full" />
                        </Form.Item>
                      </div>
                      <div className="flex flex-row w-full gap-2 justify-between items-center">
                        <Form.Item
                          className="w-1/2"
                          label="Specialty"
                          name="specialty"
                          rules={[{ required: false, message: 'Please check at least one specialty' }]}
                        >
                          <Checkbox
                            multiple
                            onChangeTriger={multipleChange}
                            item={[
                              'General radiology',
                              'Chest Imaging',
                              'Neuro-radiology',
                              'Pediatric',
                              'Nuclear Medicine',
                              'Female Imaging',
                            ]}
                            defaultSelect={['General radiology']}
                          />
                        </Form.Item>
                        <Form.Item
                          className="w-1/2"
                          label="Registration and accreditation"
                          name="accreditation"
                          rules={[{ required: false, message: 'Please select an accreditation' }]}
                        >
                          <Checkbox
                            multiple
                            onChangeTriger={multipleChange}
                            item={['GMC', 'MCIRL', 'AHPRA', 'MCNZ', 'FRANZCR', 'Other']}
                            defaultSelect={['GMC']}
                          />
                        </Form.Item>
                      </div>

                      <div className="flex flex-row w-full gap-2 justify-between items-center">
                        <Form.Item
                          className="w-1/2"
                          label="Modality"
                          name="modality"
                          rules={[{ required: false, message: 'Please check at least one modality' }]}
                        >
                          <Checkbox
                            multiple
                            onChangeTriger={multipleChange}
                            item={['CT', 'MRI', 'PET', 'X-RAY', 'Ultrasound']}
                            defaultSelect={['CT']}
                          />
                        </Form.Item>
                      </div>
                    </>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Checkbox onChange={onChange} checked={state.checked}>
                    Creating an account means you’re okay with our Terms of Service and Privacy Policy
                  </Checkbox>
                </div>
                <Form.Item>
                  <Button
                    className="w-full h-12 p-0 my-6 text-sm font-medium"
                    htmlType="submit"
                    type="primary"
                    size="large"
                  >
                    {isLoading ? 'Creating...' : 'Create Account'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
              <p className="mb-0 text-sm font-medium text-body dark:text-white60">
                Already have an account?
                <Link to="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                  Sign In
                </Link>
              </p>
            </div>
          </AuthFormWrap>
        )) ||
          (form === 'institution' && (
            <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
              <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
                <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Institution sign up</h2>
              </div>
              <div className="px-10 pt-8 pb-6">
                <Form name="register" onFinish={handleInstitution} layout="vertical">
                  <div className="mb-4">
                    <div className="flex flex-row w-full gap-2 justify-between items-center">
                      <Form.Item
                        label="Institution name"
                        name="institutionName"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                        rules={[{ required: true, message: 'Please input your institution name!' }]}
                      >
                        <Input placeholder="XYX Health" />
                      </Form.Item>
                      <Form.Item
                        label="Institution email"
                        name="institutionEmail"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                        rules={[{ required: true, message: 'Please input your institution email!', type: 'email' }]}
                      >
                        <Input placeholder="info@xyz.com" />
                      </Form.Item>
                    </div>
                    <div className="flex flex-row w-full gap-2 justify-between items-center">
                      <Form.Item
                        label="Institution password"
                        name="institutionPassword"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                        rules={[
                          { required: true, message: 'Please input your institution password!', type: 'password' },
                        ]}
                      >
                        <Input.Password placeholder="***********" />
                      </Form.Item>
                      <Form.Item
                        label="Confirm Password"
                        name="cfminstitutionPassword"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                        rules={[
                          { required: true, message: 'Please confirm your in institution password!', type: 'password' },
                        ]}
                      >
                        <Input.Password placeholder="***********" />
                      </Form.Item>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-row w-full gap-2 justify-between items-center">
                      <Form.Item
                        className="w-1/2"
                        label="Institution country"
                        name="institutionCountry"
                        rules={[{ required: true, message: 'Please select your institution country!' }]}
                      >
                        <Select>
                          <Select.Option value="NG">Nigeria</Select.Option>
                          <Select.Option value="IL">Israel</Select.Option>
                        </Select>
                      </Form.Item>
                      <Form.Item
                        className="w-1/2"
                        label="Institution city"
                        name="institutionCity"
                        rules={[{ required: true, message: 'Please select institution your city!' }]}
                      >
                        <Select>
                          <Select.Option value="FCT">Federal Capital Territory</Select.Option>
                          <Select.Option value="TLV">Tel Aviv</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="flex flex-row w-full gap-2 justify-between items-center">
                      <Form.Item
                        name="institutionPhone"
                        label="Institution phone number"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                        rules={[{ required: true, message: 'Please input your institution phone number!' }]}
                      >
                        <Input placeholder="+1 5678 475 58" />
                      </Form.Item>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Checkbox onChange={onChange} checked={state.checked}>
                      Creating an account means you agree with our Terms of Service and Privacy Policy
                    </Checkbox>
                  </div>
                  <Form.Item>
                    <Button
                      className="w-full h-12 p-0 my-6 text-sm font-medium"
                      htmlType="submit"
                      type="primary"
                      size="large"
                    >
                      {isLoading ? 'Creating...' : 'Create Account'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <div className="p-6 text-center bg-gray-100 dark:bg-white10 rounded-b-md">
                <p className="mb-0 text-sm font-medium text-body dark:text-white60">
                  Already have an account?
                  <Link to="/" className="ltr:ml-1.5 rtl:mr-1.5 text-info hover:text-primary">
                    Sign In
                  </Link>
                </p>
              </div>
            </AuthFormWrap>
          ))}
      </Col>
    </Row>
  );
}

export default SignUpRadio;
