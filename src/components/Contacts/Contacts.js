import { AutoComplete, Button } from 'antd';
import React, { useEffect } from 'react';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { PhoneFilled, VideoCameraFilled } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { contacts } from './datas';
import { MdOutlineChat, MdOutlineMarkUnreadChatAlt, MdVideoCameraFront } from 'react-icons/md';
import { FiVideo } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, setOnCall } from '../../redux/globals/actions';

import useContacts from './hooks/useContacts';
import { getItem } from '../../utility/localStorageControl';

const Contacts = () => {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.globals);
  const { getContacts, contacts, onCallUser } = useContacts();
  useEffect(() => {
    if (!contacts?.length) {
      getContacts();
    }
  }, []);

  return (
    <div className="h-full">
      <div className="[&>.ant-select>.ant-select-selector]:border-none [&>.ant-select>.ant-select-selector]:h-[50px] [&>.ant-select>.ant-select-selector>.ant-select-selection-search>.ant-input-affix-wrapper]:h-[50px]">
        <AutoComplete placeholder="Search your contacts" patterns className=" w-full" />
      </div>
      <ul className="mb-0 ">
        {contacts.map((user, i) => (
          <li key={i} className="flex flex-row justify-between items-center my-3">
            <div className="inline-flex items-center">
              <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" />
              {user?.psn_first_name || ' '} {user?.psn_last_name || ' '}
            </div>
            <div className="flex flex-row justify-evenly gap-2 items-center">
              <Button
                className="flex flex-col justify-center items-center  w-8 h-8 rounded-full text-blue-900 hover:text-white hover:bg-blue-900 border-0"
                onClick={() => {
                  history(`/admin/main/chat/private/${user?.psn_email}`);
                  dispatch(setDrawer(false));
                }}
              >
                <MdOutlineChat size={18} />
              </Button>
              <Button
                onClick={() => {
                  onCallUser(user?.id);
                }}
                className="flex justify-center items-center w-8 h-8 rounded-full text-green-500 hover:text-white hover:bg-green-500 border-0"
              >
                <PhoneFilled className="w-5 h-5" />
              </Button>
              <Button
                onClick={() => {
                  onCallUser(user?.id);
                }}
                className="flex flex-col justify-center items-center w-8 h-8 rounded-full text-gray-900 hover:text-white hover:bg-gray-900 border-0"
              >
                <FiVideo size={18} />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contacts;
