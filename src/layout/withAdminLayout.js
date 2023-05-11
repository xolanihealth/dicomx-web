import UilEllipsisV from '@iconscout/react-unicons/icons/uil-ellipsis-v';
import { Button, Col, Layout, Row } from 'antd';
import propTypes from 'prop-types';
import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
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
const { theme } = require('../config/theme/themeVariables');

const { Header, Sider, Content } = Layout;

const ThemeLayout = (WrappedComponent) => {
  class LayoutComponent extends Component {
    constructor(props) {
      super(props);
      this.state = {
        collapsed: false,
        hide: true,
      };
      this.updateDimensions = this.updateDimensions.bind(this);
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions() {
      this.setState({
        collapsed: window.innerWidth <= 1200 && true,
      });
    }

    render() {
      const { collapsed, hide } = this.state;
      const { layoutMode, rtl, topMenu } = this.props;

      const left = !rtl ? 'left' : 'right';
      const toggleCollapsed = () => {
        this.setState({
          collapsed: !collapsed,
        });
      };

      const toggleCollapsedMobile = () => {
        if (window.innerWidth <= 990) {
          this.setState({
            collapsed: !collapsed,
          });
        }
      };

      const onShowHide = () => {
        this.setState({
          hide: !hide,
        });
      };

      const SideBarStyle = {
        margin: '63px 0 0 0',
        padding: `${!rtl ? '20px 20px 55px 0' : '20px 0 55px 20px'}`,
        overflowY: 'auto',
        height: '100vh',
        position: 'fixed',
        [left]: 0,
        zIndex: 988,
      };

      function renderThumb({ style }) {
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: '#F1F2F6',
        };
        return <div style={{ ...style, ...thumbStyle }} />;
      }
      const renderTrackVertical = () => {
        const thumbStyle = {
          position: 'absolute',
          width: '6px',
          transition: 'opacity 200ms ease 0s',
          opacity: 0,
          [rtl ? 'left' : 'right']: '0px',
          bottom: '2px',
          top: '2px',
          borderRadius: '3px',
        };
        return <div className="[&>div]:bg-regular dark:[&>div]:bg-[#32333f]" style={thumbStyle} />;
      };
      function renderView({ style }) {
        const customStyle = {
          marginRight: rtl && 'auto',
          [rtl ? 'marginLeft' : 'marginRight']: '-17px',
        };
        return <div style={{ ...style, ...customStyle }} />;
      }
      renderThumb.propTypes = {
        style: propTypes.shape(propTypes.object),
      };
      renderView.propTypes = {
        style: propTypes.shape(propTypes.object),
      };

      return (
        <LayoutContainer>
          <Layout className="layout">
            <Header
              style={{
                position: 'fixed',
                width: '100%',
                top: 0,
                [!rtl ? 'left' : 'right']: 0,
              }}
              className="px-0 flex items-center justify-between bg-white dark:bg-[#1b1e2b] dark:shadow-[0_5px_20px_rgba(160,160,160,.02)] h-[56px] z-998"
            >
              <div className="flex flex-row items-center flex-1 h-full">
                <div className=" rtl:ssm:pr-[15px] ltr:pr-5 rtl:pl-5 ltr:ssm:pl-[15px] ltr:ssm:pr-[15px] rtl:ssm::pl:[15px] ltr:pl-[30px] rtl:pr-[30px] xs:ltr:pl-[20px] xs:rtl:pr-[20px] min-w-[280px] ssm:min-w-[220px] xs:min-w-[170px] h-full grid align-middle dark:bg-[#323541]">
                  <div className="flex items-center justify-between">
                    <Link to="/admin">
                      <img className="w-full max-w-[120px] xs:max-w-[100px]" src={logoImg} alt="" />
                    </Link>
                    {!topMenu || window.innerWidth <= 991 ? (
                      <Button
                        type="link"
                        className="p-0 bg-transparent border-none dark:border-transparent dark:bg-transparent dark:text-white60 dark:hover:text-primary text-[#525768] hover:text-primary"
                        onClick={toggleCollapsed}
                      >
                        <MySVG />
                      </Button>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-8 px-8 flex-auto ltr:mr-[10px] rtl:ml-[10px] [&>div:first-child]:flex [&>div]:items-center ">
                  {/* {topMenu && window.innerWidth > 991 ? <TopMenu /> : <CustomizerWrap rtl={rtl} />} */}
                  <div className="flex flex-row gap-2 px-8">
                    <Button
                      size="default"
                      // onClick={addParentActive} to={`${path}/tables/dataTable`}
                      className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Studies
                    </Button>
                    <Button
                      size="default"
                      className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Viewer
                    </Button>
                    <Button
                      size="default"
                      className="bg-secondary-transparent border-0 hover:bg-secondary hover:text-white text-primary dark:text-white87 text-[12px] font-semibold leading-[22px] inline-flex items-center justify-center rounded-[40px] px-[20px] h-[32px] gap-[8px]"
                    >
                      <UilLayers className="w-[14px] h-[14px]" />
                      Radiologists
                    </Button>
                  </div>

                  <div className="flex flex-row items-center md:hidden">
                    <TopMenuSearch>
                      <div className="flex gap-2 top-right-wrap">
                        <Button
                          style={{ width: '32px' }}
                          size="default"
                          className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                        >
                          <PhoneFilled className="w-[14px] h-[14px]" />
                        </Button>
                        <Button
                          style={{ width: '32px' }}
                          size="default"
                          className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                        >
                          <VideoCameraOutlined className="w-[14px] h-[14px]" />
                        </Button>
                        <Button
                          style={{ width: '32px' }}
                          size="default"
                          className="bg-primary hover:bg-white hover:text-primary border-solid border-1 border-primary text-white font-semibold flex items-center justify-center rounded-full p-[16px] "
                        >
                          <ContactsFilled className="w-[14px] h-[14px]" />
                        </Button>
                      </div>
                    </TopMenuSearch>
                  </div>
                </div>
              </div>
            </Header>
            <Row>
              <Col md={0} sm={24} xs={24}>
                <SmallScreenAuthInfo hide={hide}>
                  <AuthInfo rtl={rtl} />
                </SmallScreenAuthInfo>
              </Col>
            </Row>
            <Layout>
              {!topMenu || window.innerWidth <= 991 ? (
                <ThemeProvider theme={theme}>
                  <Sider
                    width={280}
                    style={SideBarStyle}
                    collapsed={collapsed}
                    theme={layoutMode === 'lightMode' ? 'light' : 'dark'}
                  >
                    <Scrollbars
                      className="custom-scrollbar"
                      autoHide
                      autoHideTimeout={500}
                      autoHideDuration={200}
                      // renderThumbHorizontal={renderThumbHorizontal}
                      renderThumbVertical={renderThumb}
                      renderView={renderView}
                      renderTrackVertical={renderTrackVertical}
                    >
                      <MenueItems topMenu={topMenu} toggleCollapsed={toggleCollapsedMobile} />
                    </Scrollbars>
                  </Sider>
                </ThemeProvider>
              ) : null}
              <Layout className="atbd-main-layout">
                <Content>
                  <WrappedComponent {...this.props} />
                  <FooterStyle className="bg-white dark:bg-[#1B1E2B]">
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
                </Content>
              </Layout>
            </Layout>
          </Layout>
          {window.innerWidth <= 991 ? (
            <span className={collapsed ? 'hexadash-shade' : 'hexadash-shade show'} onClick={toggleCollapsed} />
          ) : (
            ''
          )}
        </LayoutContainer>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      layoutMode: state.ChangeLayoutMode.mode,
      rtl: state.ChangeLayoutMode.rtlData,
      topMenu: state.ChangeLayoutMode.topMenu,
    };
  };

  LayoutComponent.propTypes = {
    layoutMode: propTypes.string,
    rtl: propTypes.bool,
    topMenu: propTypes.bool,
  };

  return connect(mapStateToProps)(LayoutComponent);
};
export default ThemeLayout;
