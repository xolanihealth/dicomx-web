import { Button, Layout, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TopMenuSearch } from './Style';
import { ReactComponent as MySVG } from '../static/img/icon/left-bar.svg';
import logoImg from '../static/img/dicomx-logo-new.svg';
import { Popover } from '../components/popup/popup';
import {
  PhoneFilled,
  VideoCameraOutlined,
  TeamOutlined,
  FolderOpenOutlined,
  DesktopOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { setDrawer, setDrawerChildren } from '../redux/globals/actions';
import Contacts from '../components/Contacts';
import { MdGroups, MdPhoneEnabled, MdVideocam } from 'react-icons/md';

const { theme } = require('../config/theme/themeVariables');

const { Header, Sider } = Layout;
const { Text } = Typography;
const AppHeader = () => {
  const dispatch = useDispatch();

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
            <div className="flex gap-2 top-right-wrap">
              <Button
                onClick={() => {
                  dispatch(setDrawer(true));
                  dispatch(setDrawerChildren(<Contacts />));
                }}
                title="Start Call"
                className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-green-500 border-0 text-white"
              >
                <MdPhoneEnabled size={20} />
              </Button>
              <Button
                onClick={() => {
                  dispatch(setDrawer(true));
                  dispatch(setDrawerChildren(<Contacts />));
                }}
                title="Start Call"
                className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-green-500 text-white border-0"
              >
                <MdVideocam size={20} />
              </Button>
              <Button
                size="default"
                className="rounded-full flex flex-col justify-center items-center w-8 h-8 bg-primary text-white border-0"
                onClick={() => {
                  dispatch(setDrawer(true));
                  dispatch(setDrawerChildren(<Contacts />));
                }}
              >
                <MdGroups size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
};

export default AppHeader;
