import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { Row, Col, Form, Input, Button, Select, Collapse, Switch, DatePicker, Upload } from 'antd';
import UilFacebook from '@iconscout/react-unicons/icons/uil-facebook-f';
import UilTwitter from '@iconscout/react-unicons/icons/uil-twitter';
import UilGithub from '@iconscout/react-unicons/icons/uil-github';

import { useDispatch } from 'react-redux';
import { AuthFormWrap } from './style';
import { Checkbox } from '../../../../components/checkbox/checkbox';
import { register } from '../../../../redux/authentication/actionCreator';

function SignUpRadio() {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    values: null,
    checked: null,
  });
  const handleSubmit = (values) => {
    dispatch(register(values));
  };

  const onChange = (checked) => {
    setState({ ...state, checked });
  };

  const [isInterpreter, setIsInterPreter] = useState(false);

  const toggleIsInterpreter = () => {
    setIsInterPreter(!isInterpreter);
  };

  const props = {
    name: 'file',
    beforeUpload: () => false,
  };
  return (
    <Row justify="center">
      <Col xxl={18} xl={18} md={18} sm={18} xs={24}>
        <AuthFormWrap className="mt-6 bg-white rounded-md dark:bg-white10 shadow-regular dark:shadow-none">
          <div className="px-5 py-4 text-center border-b border-gray-200 dark:border-white10">
            <h2 className="mb-0 text-xl font-semibold text-dark dark:text-white87">Sign Up as a Radiographer</h2>
          </div>
          <div className="px-10 pt-8 pb-6">
            <Form name="register" onFinish={handleSubmit} layout="vertical">
              <div className="mb-4">
                <div className="flex flex-row w-full gap-2 justify-between items-center">
                  <Form.Item
                    label="First Name"
                    name="fname"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                    rules={[{ required: true, message: 'Please input your first name!' }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lname"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                    rules={[{ required: true, message: 'Please input your last name!' }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                </div>
                <div className="flex flex-row w-full gap-2 justify-between items-center">
                  <Form.Item
                    label="Password"
                    name="password"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="cpassword"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium  w-1/2"
                    rules={[{ required: true, message: 'Please confirm your password!' }]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-row w-full gap-2 justify-between items-center">
                  <Form.Item
                    name="email"
                    label="Email Address"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                    rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                  >
                    <Input placeholder="name@example.com" />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number"
                    name="phone"
                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                  >
                    <Input placeholder="Phone Number" />
                  </Form.Item>
                </div>
                <div className="flex flex-row w-full gap-2 justify-between items-center">
                  <Form.Item
                    className="w-1/2"
                    label="Country"
                    name="country"
                    rules={[{ required: true, message: 'Please select your country!' }]}
                  >
                    <Select>
                      <Select.Option value="NG">Nigeria</Select.Option>
                      <Select.Option value="IL">Israel</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="w-1/2"
                    label="State/Province"
                    name="state"
                    rules={[{ required: true, message: 'Please select your state!' }]}
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
                  <div className="text-primary">Are you an Interpreter?</div>
                  <Switch onChange={toggleIsInterpreter} />
                </div>
                {isInterpreter && (
                  <>
                    <div className="flex flex-row w-full gap-2 justify-between items-center">
                      <Form.Item
                        label="Upload CV"
                        name="cv"
                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium w-1/2"
                        rules={[{ required: true, message: 'Please upload your CV!' }]}
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
                        rules={[{ required: true, message: 'Please select a valid date' }]}
                      >
                        <DatePicker className="w-full" />
                      </Form.Item>
                    </div>
                    <div className="flex flex-row w-full gap-2 justify-between items-center"></div>
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
                  Create Account
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
      </Col>
    </Row>
  );
}

export default SignUpRadio;
