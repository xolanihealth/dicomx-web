import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'antd';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilExpandArrows from '@iconscout/react-unicons/icons/uil-expand-arrows';
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';
import PropTypes from 'prop-types';
import { GlobalUtilityStyle } from '../styled';
import Heading from '../../components/heading/heading';
import { Button } from '../../components/buttons/buttons';

const DragHandle = sortableHandle(() => <UilExpandArrows className="w-4 h-4 text-light dark:text-white60" />);

function DragAndDropTable() {
  const { users } = useSelector((state) => {
    return {
      users: state.users,
    };
  });

  const usersTableData = [];
  users.map((user, index) => {
    const { name, designation, img } = user;

    return usersTableData.push({
      key: index + 1,
      index,
      user: (
        <div className="flex items-center gap-x-[10px] gap-y-[10px]">
          <figure className="mb-0">
            <img style={{ width: '40px' }} src={require(`../../${img}`)} alt="" />
          </figure>
          <figcaption>
            <Heading className="user-name text-[14px] mb-0" as="h6">
              {name}
            </Heading>
          </figcaption>
        </div>
      ),
      email: <span className="text-sm font-medium dark:text-white60">john@gmail.com</span>,
      company: <span className="text-sm font-medium dark:text-white60">Business Development</span>,
      position: <span className="text-sm font-medium dark:text-white60">{designation}</span>,
      joinDate: <span className="text-sm font-medium dark:text-white60">January 20, 2020</span>,
      action: (
        <div className="flex items-center dark:gap-[6px]">
          <Button
            className="inline-flex items-center justify-center border-none shadow-none text-light-extra dark:text-white60 dark:bg-white10 hover:bg-info-transparent hover:text-info"
            to="#"
            shape="circle"
          >
            <UilEdit className="text-[currentColor] dark:text-white60 w-[14px] h-[14px]" />
          </Button>
          <Button
            className="inline-flex items-center justify-center border-none shadow-none text-light-extra dark:text-white60 dark:bg-white10 hover:bg-danger-transparent hover:text-danger"
            to="#"
            shape="circle"
          >
            <UilTrashAlt className="text-[currentColor] dark:text-white60 w-[14px] h-[14px]" />
          </Button>
        </div>
      ),
    });
  });

  const usersTableColumns = [
    {
      dataIndex: 'sort',
      width: 30,
      render: () => <DragHandle />,
    },
    {
      dataIndex: 'user',
    },
    {
      dataIndex: 'email',
    },
    {
      dataIndex: 'company',
    },
    {
      dataIndex: 'position',
    },
    {
      dataIndex: 'joinDate',
    },
    {
      dataIndex: 'action',
      width: '90px',
    },
  ];

  const [state, setState] = useState({
    dataSource: usersTableData,
  });

  const { dataSource } = state;

  const SortableItem = sortableElement((props) => <tr {...props} />);
  const SortableContainer = sortableContainer((props) => <tbody {...props} />);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const newData = arrayMoveImmutable([].concat(dataSource), oldIndex, newIndex).filter((el) => !!el);
      setState({ ...state, dataSource: newData });
    }
  };

  function DraggableBodyRow({ className, style, ...restProps }) {
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex((x) => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  }

  DraggableBodyRow.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
  };

  function DraggableContainer(props) {
    return <SortableContainer useDragHandle helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />;
  }

  return (
    <GlobalUtilityStyle>
      <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
        <div className="py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
          <Heading as="h4" className="mb-0 text-lg font-medium">
            Drag & Drop
          </Heading>
        </div>
        <div className="p-[25px]">
          <div className="table-responsive table-head-none hover-tr-none table-pl-0 table-border-b-none dark:[&>div>div>div>div>div>div>table>tbody>tr>td]:border-white10">
            <Table
              pagination={false}
              dataSource={dataSource}
              columns={usersTableColumns}
              rowKey="index"
              components={{
                body: {
                  wrapper: DraggableContainer,
                  row: DraggableBodyRow,
                },
              }}
            />
          </div>
        </div>
      </div>
    </GlobalUtilityStyle>
  );
}

export default DragAndDropTable;
