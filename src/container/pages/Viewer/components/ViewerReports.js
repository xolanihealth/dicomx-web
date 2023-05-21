import { Form, Col, Row, Input, Select, DatePicker, Divider, Button } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../../../utility/localStorageControl';
import { Drawer } from '../../../../components/drawer/drawer';
import { GlobalUtilityStyle } from '../../../styled';

const { Option } = Select;
const Reports = () => {
  return (
    <>
      <Divider orientation="left">Write your reports</Divider>
      <Form layout="vertical" requiredMark>
        <Row gutter={16}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="patientName"
              label="Patient name"
              rules={[{ required: true, message: 'Please enter patient name' }]}
            >
              <Input placeholder="Please enter patient name" />
            </Form.Item>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="patientDob"
              label="Patient Dob"
              rules={[{ required: true, message: "Please choose the patient's date of birth" }]}
            >
              <DatePicker
                onChange={(e) => console.log(e)}
                placeholder="Patient date of birth"
                className="border-normal dark:border-white10 h-[50px] min-w-[250px]"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="examInformation"
              label="Exam information"
              rules={[
                {
                  required: true,
                  message: 'please enter an exam information',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter an exam information" />
            </Form.Item>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="modality"
              label="Modality"
              rules={[{ required: true, message: 'Please choose the modality' }]}
            >
              <Select className="dark:[&>.ant-select-arrow]:text-white60" placeholder="Please choose the modality">
                <Option value="mri">MRI</Option>
                <Option value="ct">CT</Option>
                <Option value="pet">PET</Option>
                <Option value="xray">X-RAY</Option>
                <Option value="us">Ultrasound</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="findings"
              label="Findings"
              rules={[
                {
                  required: true,
                  message: 'please enter an exam findings',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter an exam findings" />
            </Form.Item>
          </Col>
          <Col lg={12} sm={24} xs={24}>
            <Form.Item
              name="recommendations"
              label="Recommendations"
              rules={[
                {
                  required: true,
                  message: 'please enter your recommendations',
                },
              ]}
            >
              <Input.TextArea rows={4} placeholder="please enter your recommendations" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={24} sm={24} xs={24}>
            <Form.Item
              name="remotePractionerId"
              label="Your name"
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input placeholder="Please enter your name" />
            </Form.Item>
          </Col>
          <Col lg={24} sm={24} xs={24}>
            <Form.Item
              name="remotePractionerEmail"
              label="Your email"
              rules={[{ required: true, message: 'Please enter your email address', type: 'email' }]}
            >
              <Input placeholder="Please enter your email address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col lg={24} sm={24} xs={24}>
            <Button
              className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white dark:text-white87 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-full px-[20px] py-[5px]"
              type="primary"
              size="large"
              loading={false}
            >
              {false ? 'Submiting report...' : 'Submit report'}
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Reports;
