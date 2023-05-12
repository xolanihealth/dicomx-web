import React, { useState } from 'react';
import { Row, Col, Upload, message, Divider, Input, Avatar, Card, Skeleton, Switch } from 'antd';
import UilUpload from '@iconscout/react-unicons/icons/uil-upload';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { PageHeader } from '../../components/page-headers/page-headers';
import Heading from '../../components/heading/heading';

const { Search } = Input;
const { Meta } = Card;
const onSearch = (value) => console.log(value);

const { Dragger } = Upload;
function Import() {
  const PageRoutes = [
    {
      path: '/admin',
      breadcrumbName: 'Dashboard',
    },
    {
      path: '',
      breadcrumbName: 'Radiologists',
    },
  ];
  const [state, setState] = useState({
    file: null,
    list: null,
    submitValues: {},
  });

  const [loading, setLoading] = useState(true);
  const onChange = (checked) => {
    setLoading(!checked);
  };

  const fileUploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        setState({ ...state, file: info.file, list: info.fileList });
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    listType: 'picture',
    defaultFileList: [],
    showUploadList: {
      showRemoveIcon: true,
      removeIcon: <UilTrashAlt />,
    },
  };
  return (
    <>
      <PageHeader
        className="flex items-center justify-between px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col"
        title="What do you want to do today?"
        routes={PageRoutes}
      />
      <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col span={18}>
            <Divider orientation="left">Upload a study</Divider>
            <div className="[&>span>.ant-upload]:bg-white dark:[&>span>.ant-upload]:bg-whiteDark [&>span>.ant-upload]:h-[280px] [&>span>.ant-upload]:flex [&>span>.ant-upload]:items-center [&>span>.ant-upload]:border-[#c6d0dc] dark:[&>span>.ant-upload]:border-white60 [&>span>.ant-upload]:rounded-[10px]">
              <Dragger {...fileUploadProps}>
                <p className="mb-5">
                  <UilUpload className="w-6 h-6 mx-auto text-[#9299b8] dark:text-white60" />
                </p>
                <Heading as="h4" className="text-[15px] font-semibold text-[#9299b8] dark:text-white60">
                  <span> Drop an Image </span>
                  <span className="ant-upload-hint">
                    or <span>Browse one</span>
                  </span>
                </Heading>
              </Dragger>
            </div>
          </Col>
          <Col span={6}>
            <Divider orientation="left">Our community</Divider>
            <div className="">
              <Search placeholder="Search here" allowClear onChange={onChange} onSearch={onSearch} enterButton />
            </div>
            <div className="">
              <Card
                style={{
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                  title="John Doe"
                  description="Works at Elshadai hospital"
                />
              </Card>
              <Card
                style={{
                  marginTop: 16,
                }}
                loading={loading}
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />}
                  title="Jane Doe"
                  description="Works at Omega hospital"
                />
              </Card>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export default Import;
