import React from 'react';
import { Row, Col, Form, Input, Button, DatePicker, Select } from 'antd';

const { TextArea } = Input;

function MultiColumnForm({ state, dispatch, onSubmitStudy }) {
  const modalities = ['CT', 'MRI', 'PET', 'X-RAY', 'Ultrasound'];
  const { patientName, age, gender, studyDescription, modality, studyDate, clinicalHistory, studyLocation } = state;
  return (
    <div className="bg-white dark:bg-white10 m-0 p-0 text-theme-gray dark:text-white60 text-[15px] rounded-10 relative h-full border">
      <div className="px-[25px] text-dark dark:text-white87 font-normal m-0 p-0 border-regular dark:border-white10 border-b">
        <h1 className="mb-0 inline-block py-[5px] overflow-hidden whitespace-nowrap text-ellipsis text-[18px] font-normal">
          Study details
        </h1>
      </div>
      <div className="p-[25px]">
        <Form name="multi-form" layout="horizontal">
          <Row gutter={30}>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="patientName">
                <Input
                  value={patientName}
                  onChange={(e) => dispatch({ patientName: e.target.value })}
                  placeholder="Patient name"
                />
              </Form.Item>
              <Form.Item name="age">
                <Input value={age} onChange={(e) => dispatch({ age: e.target.value })} placeholder="Patient age" />
              </Form.Item>
              <Form.Item name="gender">
                <Input
                  value={gender}
                  onChange={(e) => dispatch({ gender: e.target.value })}
                  placeholder="Patient gender"
                />
              </Form.Item>
              <Form.Item name="studyDescription">
                <TextArea
                  value={studyDescription}
                  onChange={(e) => dispatch({ studyDescription: e.target.value })}
                  placeholder="study description"
                />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="mb-25">
              <Form.Item name="studyDate">
                <DatePicker
                  onChange={(e) => dispatch({ studyDate: e })}
                  placeholder="Study Date"
                  className="border-normal dark:border-white10 h-[50px] min-w-[250px]"
                />
              </Form.Item>
              <Form.Item name="clinicalHistory">
                <TextArea
                  value={clinicalHistory}
                  onChange={(e) => dispatch({ clinicalHistory: e.target.value })}
                  placeholder="Clinical history"
                />
              </Form.Item>
              <Form.Item name="studyLocation">
                <Input
                  value={studyLocation}
                  onChange={(e) => dispatch({ studyLocation: e.target.value })}
                  placeholder="Study location"
                />
              </Form.Item>
              <Form.Item label="Modality" name="modality">
                <Select onChange={(e) => dispatch({ modality: e })}>
                  {modalities.map((val) => (
                    <Select.Option value={val}>{val}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col sm={12} xs={24}>
              <div className="flex flex-wrap gap-[15px]">
                {/* <Button
                  className="bg-theme-gray-transparent dark:bg-white30 hover:bg-hbr-gray dark:hover:bg-white10 border-none text-theme-gray dark:text-white60 hover:text-white text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[4px] px-[20px] h-[44px]"
                  htmlType="submit"
                  type="light"
                  size="large"
                >
                  Cancel
                </Button> */}
                <Button
                  className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white dark:text-white87 text-[14px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-full px-[20px] py-[5px]"
                  type="primary"
                  size="large"
                  onClick={() => onSubmitStudy()}
                >
                  Next
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export { MultiColumnForm };
