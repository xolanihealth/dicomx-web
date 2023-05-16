import UilSignout from '@iconscout/react-unicons/icons/uil-signout';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilUsersAlt from '@iconscout/react-unicons/icons/uil-users-alt';
import { Button, Col, Layout, Row, Avatar } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink, useNavigate, onClick } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MenueItems from './MenueItems';
import CustomizerWrap from './overview/Customizer';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from '../components/utilities/auth-info/Search';
import AuthInfo from '../components/utilities/auth-info/info';
import { ReactComponent as MySVG } from '../static/img/icon/left-bar.svg';
import logoImg from '../static/img/dicomx-logo-new.svg';
import { Popover } from '../components/popup/popup';
import { AutoComplete } from '../components/autoComplete/autoComplete';
import {
  PhoneFilled,
  VideoCameraOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  DesktopOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';

const { theme } = require('../config/theme/themeVariables');

const { Header, Sider } = Layout;

const AppHeader = ({ onCall, setOnCall }) => {
  const toggleCall = () => {
    setOnCall(!onCall);
  };
  const userContent = (
    <div>
      <div className="min-w-[280px] sm:min-w-full pt-4">
        <div className="[&>.ant-select>.ant-select-selector]:border-none [&>.ant-select>.ant-select-selector]:h-[50px] [&>.ant-select>.ant-select-selector>.ant-select-selection-search>.ant-input-affix-wrapper]:h-[50px]">
          <AutoComplete placeholder="Search your contacts" width="100%" patterns />
        </div>
        <ul className="mb-0">
          <li>
            <Link
              to="#"
              className="inline-flex justify-between items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <div className="inline-flex items-center">
                <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Md. Rofiq
              </div>
              <div className="inline-flex items-center">
                <Link className="inline-block m-2" to="/admin/main/chat/private/rofiq@gmail.com">
                  <UilEye className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <PhoneFilled className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <VideoCameraOutlined className="w-5 h-5" />
                </Link>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="inline-flex justify-between items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <div className="inline-flex items-center">
                <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Roshid Khan
              </div>
              <div className="inline-flex items-center">
                <Link className="inline-block m-2" to="/admin/main/chat/private/rosid@gmail.com">
                  <UilEye className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <PhoneFilled className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <VideoCameraOutlined className="w-5 h-5" />
                </Link>
              </div>
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="inline-flex justify-between items-center hover:bg-shadow-transparent text-light dark:text-white60 dark:hover:text-white hover:text-primary dark:hover:bg-white10 dark:rounded-4 hover:pl-6 w-full px-2.5 py-3 text-sm transition-all ease-in-out delay-150"
            >
              <div className="inline-flex items-center">
                <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" /> Domnic Harys
              </div>
              <div className="inline-flex items-center">
                <Link className="inline-block m-2" to="/admin/main/chat/private/domic@gmail.com">
                  <UilEye className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <PhoneFilled className="w-5 h-5" />
                </Link>
                <Link className="inline-block m-2" to="#">
                  {/* <UilEye className="w-4 text-light-extra dark:text-white60" /> */}
                  <VideoCameraOutlined className="w-5 h-5" />
                </Link>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

  return (
    <Header
      style={{
        position: 'fixed',
        width: '100%',
        top: 0,
        right: 0,
      }}
      className="flex border bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[45px] z-998"
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
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[30px] gap-[8px]"
            >
              <FolderOpenOutlined className="w-[14px] h-[14px]" />
              Studies
            </Link>
            <Link
              size="default"
              to="/admin/viewer"
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[30px] gap-[8px]"
            >
              <DesktopOutlined className="w-[14px] h-[14px]" />
              Viewer
            </Link>
            <Link
              to="/admin/radiologist"
              size="default"
              className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[30px] gap-[8px]"
            >
              <UserSwitchOutlined className="w-[14px] h-[14px]" />
              Radiologists
            </Link>
          </div>

          <div className="flex flex-row items-center md:hidden">
            <TopMenuSearch>
              <div className="flex gap-2 top-right-wrap">
                <Popover placement="bottomRight" content={userContent} action="click">
                  <Button
                    style={{ width: '32px' }}
                    size="default"
                    className="bg-green-500 hover:bg-white hover:text-green-500 border-solid border-1 border-green-500 text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                    onClick={toggleCall}
                  >
                    <PhoneFilled className="w-[14px] h-[14px]" />
                  </Button>
                </Popover>

                <Popover placement="bottomRight" content={userContent} action="click">
                  <Button
                    style={{ width: '32px' }}
                    size="default"
                    className="bg-green-500 hover:bg-white hover:text-green-500 border-solid border-1 border-green-500 text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                  >
                    <VideoCameraOutlined className="w-[14px] h-[14px]" />
                  </Button>
                </Popover>

                <Popover placement="bottomRight" content={userContent} action="click">
                  <Button
                    style={{ width: '32px' }}
                    size="default"
                    className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                  >
                    <TeamOutlined className="w-[14px] h-[14px]" />
                  </Button>
                </Popover>
              </div>
            </TopMenuSearch>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
