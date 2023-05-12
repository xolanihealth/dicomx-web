import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MenueItems from './MenueItems';
import CustomizerWrap from './overview/Customizer';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from '../components/utilities/auth-info/Search';
import AuthInfo from '../components/utilities/auth-info/info';
import { ReactComponent as MySVG } from '../static/img/icon/left-bar.svg';
import logoImg from '../static/img/dicomx-logo-new.svg';
import UilLayers from '@iconscout/react-unicons/icons/uil-layers';
import { PhoneFilled, VideoCameraOutlined, TeamOutlined } from '@ant-design/icons';
import { sayHello } from '../utility/utility';

const { theme } = require('../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;

const AppHeader = ({ onCall, setOnCall }) => {
  const toggleCall = () => {
    setOnCall(!onCall);
  };

  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        right: 0,
      }}
      className="px-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[56px] z-998"
    >
      <div className="flex flex-row items-center flex-1 h-full">
        <div className=" rtl:ssm:pr-[15px] ltr:pr-5 rtl:pl-5 ltr:ssm:pl-[15px] ltr:ssm:pr-[15px] rtl:ssm::pl:[15px] ltr:pl-[30px] rtl:pr-[30px] xs:ltr:pl-[20px] xs:rtl:pr-[20px] min-w-[280px] ssm:min-w-[220px] xs:min-w-[170px] h-full grid align-middle dark:bg-[#323541]">
          <div className="flex items-center justify-between">
            <Link to="/admin">
              <img className="w-full max-w-[120px] xs:max-w-[100px]" src={logoImg} alt="" />
            </Link>
            {window.innerWidth <= 991 ? (
              <Button
                type="link"
                className="p-0 bg-transparent border-none dark:border-transparent dark:bg-transparent dark:text-white60 dark:hover:text-primary text-[#525768] hover:text-primary"
              >
                <MySVG />
              </Button>
            ) : null}
          </div>
        </div>
        <div className="flex items-center justify-between gap-8 px-8 flex-auto ltr:mr-[10px] rtl:ml-[10px] [&>div:first-child]:flex [&>div]:items-center ">
          <div className="flex flex-row gap-2 px-8">
            <Link
              size="default"
              to="/admin/tables/dataTable"
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
            >
              <UilLayers className="w-[14px] h-[14px]" />
              Studies
            </Link>
            <Link
              size="default"
              to="/admin/viewer"
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
            >
              <UilLayers className="w-[14px] h-[14px]" />
              Viewer
            </Link>
            <Link
              to="/admin/radiologist"
              size="default"
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
            >
              <UilLayers className="w-[14px] h-[14px]" />
              Radiologists
            </Link>
          </div>

          <div className="flex flex-row items-center md:hidden">
            <TopMenuSearch>
              <div className="flex gap-2 top-right-wrap">
                <Button
                  style={{ width: '32px' }}
                  size="default"
                  className="bg-success hover:bg-white hover:text-success border-solid border-1 border-success text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                  onClick={toggleCall}
                >
                  <PhoneFilled className="w-[14px] h-[14px]" />
                </Button>
                <Button
                  style={{ width: '32px' }}
                  size="default"
                  className="bg-success hover:bg-white hover:text-success border-solid border-1 border-success text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                >
                  <VideoCameraOutlined className="w-[14px] h-[14px]" onClick={sayHello} />
                </Button>
                <Button
                  style={{ width: '32px' }}
                  size="default"
                  className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                >
                  <TeamOutlined className="w-[14px] h-[14px]" />
                </Button>
              </div>
            </TopMenuSearch>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
