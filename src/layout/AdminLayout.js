import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import MenueItems from './MenueItems';
import CustomizerWrap from './overview/Customizer';
import { FooterStyle, LayoutContainer, SmallScreenAuthInfo, TopMenuSearch } from './Style';
import TopMenu from './TopMenu';
import Search from '../components/utilities/auth-info/Search';
import AuthInfo from '../components/utilities/auth-info/info';
import { ReactComponent as MySVG } from '../static/img/icon/left-bar.svg';
import logoImg from '../static/img/dicomx-logo.png';
import UilLayers from '@iconscout/react-unicons/icons/uil-layers';
import { PhoneFilled, VideoCameraOutlined, ContactsFilled } from '@ant-design/icons';
import AppHeader from './AppHeader';
const { theme } = require('../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;

const AdminLayout = ({ props, children }) => {
  const location = useLocation();
  const splitPath = location.pathname.split('/')[2];

  return (
    <LayoutContainer>
      <Layout className="layout">
        <AppHeader />
        <Layout>
          {splitPath != 'viewer' && (
            <Sider
              width={280}
              style={{
                margin: '63px 0 0 0',
                padding: '20px 0 55px 20px',
                overflowY: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                zIndex: 988,
              }}
              collapsed={false}
            >
              <MenueItems />
            </Sider>
          )}

          <Layout className={splitPath != 'viewer' ? 'atbd-main-layout' : 'mt-14'}>
            <Content>
              {children}
              {splitPath != 'viewer' && (
                <FooterStyle className="bg-white dark:bg-[#1B1E2B] fixed bottom-0">
                  <Row>
                    <Col md={12} xs={24}>
                      <span className="inline-block w-full font-medium admin-footer__copyright md:text-center text-theme-gray dark:text-white60 md:mb-[10px]">
                        © {new Date().getFullYear()}
                        <Link className="mx-[4px] text-primary" to="#">
                          Xolani Health Inc.
                        </Link>
                      </span>
                    </Col>
                    <Col md={12} xs={24}>
                      <div className="justify-end md:justify-center items-center flex gap-[15px]">
                        {/* <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" to="#">
                            About
                          </NavLink>
                          <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" to="#">
                            Team
                          </NavLink>
                          <NavLink className="text-theme-gray dark:text-white60 text-[14px] hover:text-primary" to="#">
                            Contact
                          </NavLink> */}
                      </div>
                    </Col>
                  </Row>
                </FooterStyle>
              )}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </LayoutContainer>
  );
};

export default AdminLayout;
