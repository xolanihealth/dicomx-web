import React from 'react';
import { Row, Col } from 'antd';
import { MultiColumnForm } from './overview/MultiColumnForm';

function FormLayout({ dispatch, state, onSubmitStudy, onChecked }) {
  return (
    <>
      <main className="min-h-[715px] lg:min-h-[580px] mt-3 pb-[30px] bg-transparent">
        <Row>
          <Col xs={24}>
            <MultiColumnForm dispatch={dispatch} state={state} onSubmitStudy={onSubmitStudy} onChecked={onChecked} />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default FormLayout;
