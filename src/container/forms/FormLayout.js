import React from 'react';
import { Row, Col } from 'antd';
import { HorizontalForm } from './overview/HorizontalForm';
import { HorizontalIconForm } from './overview/HorizontalIconForm';
import { VerticalForm } from './overview/VerticalForm';
import { VerticalIconForm } from './overview/VerticalIconForm';
import { MultiColumnForm } from './overview/MultiColumnForm';

import { PageHeader } from '../../components/page-headers/page-headers';

function FormLayout() {
  return (
    <>
      <main className="min-h-[715px] lg:min-h-[580px] mt-3 pb-[30px] bg-transparent">
        <Row>
          <Col xs={24}>
            <MultiColumnForm />
          </Col>
        </Row>
      </main>
    </>
  );
}

export default FormLayout;
