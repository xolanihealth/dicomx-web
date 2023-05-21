import { AutoComplete, Button } from 'antd';
import React, { useEffect } from 'react';
import UilUser from '@iconscout/react-unicons/icons/uil-user';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import { Checkbox } from 'antd';

import useContacts from '../../../components/Contacts/hooks/useContacts';

const Practitioners = ({ onChecked }) => {
  const { getContacts, contacts } = useContacts();
  useEffect(() => {
    if (!contacts?.length) {
      getContacts();
    }
  }, []);

  return (
    <div className="w-full">
      <ul className="mb-0">
        {contacts.map((user, i) => (
          <li key={i} className="flex flex-row justify-between items-center my-3 border-b">
            <div className="inline-flex items-center">
              <UilUser className="w-4 h-4 ltr:mr-3 rtl:ml-3" />
              {user?.practitionerFirstName || ' '} {user?.practitionerLastName || ' '}
            </div>
            <div className="flex flex-row justify-evenly gap-4 items-center">
              <span className="flex flex-col justify-center items-center border-0">Available now</span>
              <span className="flex flex-row justify-center items-center border-0">
                Ratings&nbsp;
                <span className="text-yellow-500">
                  <b> 4.5</b>
                </span>
              </span>
              <span className="flex flex-row justify-center items-center border-0 text-green-500">Online</span>
              <span className="flex flex-row justify-center items-center border-0">${3.3 + i}</span>
              <Checkbox onChange={() => onChecked(user?.id)} value={user?.id}></Checkbox>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Practitioners;
