import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component, useCallback, useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect, useDispatch, useSelector } from 'react-redux';
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
import ControlPanel from '../components/Call/components/ControlPanel';
import { Drawer } from '../components/drawer/drawer';
import CallView from '../components/Call/components/CallView';
const { theme } = require('../config/theme/themeVariables');
import io from 'socket.io-client';
import {
  setCaller,
  setCalling,
  setIncomingCall,
  setPeer,
  setPopupChildren,
  setSocket,
  togglePopup,
} from '../redux/globals/actions';
import { Peer } from 'peerjs';
import { Modal } from '../components/modals/antd-modals';
import { getItem } from '../utility/localStorageControl';
import IncomingCallView from '../components/Call/components/IncomingCallView';
const { Header, Sider, Content } = Layout;

const AdminLayout = ({ props, children }) => {
  const location = useLocation();
  const splitPath = location.pathname.split('/')[2];
  const { onCall, peer, socket } = useSelector((state) => state.globals);
  const dispatch = useDispatch();

  const socketConnection = io.connect('https://xolanihealth.cloud');
  const userId = getItem('userId');
  useEffect(() => {
    if (!socket || !socket?.connected) {
      dispatch(setSocket(socketConnection));
      const localPeer = new Peer();
      dispatch(setPeer(localPeer));
      localPeer.on('open', (peerId) => {
        socketConnection.emit('peer_connected', { userId, peerId }, (value) => {
          if (value.status) {
            console.log(value.message, ' with >> ', userId, peerId);
          } else {
            console.log('Something went wrong connecting peer');
          }
        });
      });

      localPeer.on('call', (call) => {
        call.on('close', () => {
          console.log('Call should end');
        });
        const data = JSON.parse(`${call.metadata}`);
        dispatch(setCalling(true));
        dispatch(setIncomingCall(call));
        dispatch(setCaller(false));

        console.log(call);
        dispatch(togglePopup(true));
        dispatch(setPopupChildren(<IncomingCallView />));
      });

      localPeer.on('disconnected', () => {
        localPeer.reconnect();
      });
    } else if (socket && socket?.connected) {
      const localPeer = new Peer();
      dispatch(setPeer(localPeer));
      localPeer.on('open', (peer_id) => {
        socket.emit('peer_connected', { userId, peer_id }, (value) => {
          if (value.status) {
            console.log(value.message, 'is peer connected');
          } else {
            console.log('Something went wrong connecting peer');
          }
        });
      });

      localPeer.on('call', (call) => {
        // InCallManager.startRingtone("BUNDLE");
        call.on('close', () => {
          // bottomToast("Call Ended");
          console.log('Call should end here');
        });
        const data = JSON.parse(`${call.metadata}`);

        dispatch(setCalling(true));
        dispatch(setIncomingCall(call));
        dispatch(setCaller(false));
        // navigate("media_call", {
        //   state: {
        //     call: data.callType,
        //     endUser: data.user,
        //   },
        // });
      });

      localPeer.on('disconnected', () => {
        localPeer.reconnect();
      });
    }
  }, []);

  return (
    <LayoutContainer>
      <Layout className="layout">
        <ControlPanel />
        {onCall && <CallView />}
        <Drawer />
        <Modal />
        <Layout>
          <AppHeader />
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
              collapsed={true}
            >
              <MenueItems />
            </Sider>
          )}

          <Layout className={splitPath != 'viewer' ? 'atbd-main-layout' : 'mt-14'}>
            <Content c>
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
