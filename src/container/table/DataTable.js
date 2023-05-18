import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Table, Radio, Divider } from 'antd';
import UilEye from '@iconscout/react-unicons/icons/uil-eye';
import UilEdit from '@iconscout/react-unicons/icons/uil-edit';
import UilTrash from '@iconscout/react-unicons/icons/uil-trash-alt';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import Heading from '../../components/heading/heading';
import DataTable from '../../components/table/DataTable';
import UserListTable from '../pages/overview/UserTable';
import ProjectLists from '../project/overview/List';
import TaskList from '../project/overview/TaskList';
import { GlobalUtilityStyle, PaginationStyle } from '../styled';

import { tableReadData } from '../../redux/data-filter/actionCreator';

function DataTables() {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    selectionType: 'checkbox',
    selectedRowKeys: null,
    selectedRows: null,
    values: {},
  });

  const PageRoutes = [
    {
      path: 'index',
      breadcrumbName: 'Dashboard',
    },
    {
      path: 'first',
      breadcrumbName: 'Studies',
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setState({ ...state, selectedRowKeys, selectedRows });
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };

  useEffect(() => {
    if (dispatch) {
      dispatch(tableReadData());
    }
  }, [dispatch]);

  const { TableData } = useSelector((states) => {
    return {
      TableData: states.dataTable.tableData,
    };
  });

  const tableDataScource = [];

  if (TableData.length > 0) {
    TableData.map((item) => {
      const { id, name, modality, description, datetime, accession, instances, status } = item;
      return tableDataScource.push({
        id: <span className="text-body dark:text-white60 text-[12px] font-normal">{`#${id}`}</span>,
        user: <span className="text-body dark:text-white60 text-[12px] font-normal">{name}</span>,
        modality: <span className="text-body dark:text-white60 text-[12px] font-normal">{modality}</span>,
        description: <span className="text-body dark:text-white60 text-[12px] font-normal">{description}</span>,
        datetime: <span className="text-body dark:text-white60 text-[12px] font-normal">{datetime}</span>,
        accession: <span className="text-body dark:text-white60 text-[12px] font-normal">{accession}</span>,
        instances: <span className="text-body dark:text-white60 text-[12px] font-normal">{instances}</span>,
        status: (
          <span
            className={`inline-flex items-center justify-center min-h-[24px] px-3 text-xs font-normal rounded-[15px]`}
          >
            {status}
          </span>
        ),
        action: (
          <div className="min-w-[150px] text-end -m-2">
            <Link className="inline-block m-2" to="/admin/viewer">
              <UilEye className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilEdit className="w-4 text-light-extra dark:text-white60" />
            </Link>
            <Link className="inline-block m-2" to="#">
              <UilTrash className="w-4 text-light-extra dark:text-white60" />
            </Link>
          </div>
        ),
      });
    });
  }

  const dataTableColumn3 = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'coutry',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Join Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  const dataTableColumn = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Modality',
      dataIndex: 'modality',
      key: 'modality',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date Time',
      dataIndex: 'datetime',
      key: 'datetime',
    },
    {
      title: 'Accession',
      dataIndex: 'accession',
      key: 'accession',
    },
    {
      title: 'Instances',
      dataIndex: 'instances',
      key: 'instances',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'action',
      key: 'action',
      width: '90px',
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    setState({ ...state, values: { pagination, filters, sorter, extra } });
  }

  return (
    <>
      <PageHeader
        routes={PageRoutes}
        title="My Studies"
        className="flex items-center justify-between px-8 xl:px-[15px] pb-2 bg-transparent sm:flex-col"
      />
      <div className="min-h-[715px] lg:min-h-[580px] flex-1 h-auto px-8 xl:px-[15px] pb-[30px] bg-transparent">
        <GlobalUtilityStyle>
          <Row gutter={15}>
            <Col xs={24} className="mb-[25px]">
              <PaginationStyle>
                <div className="bg-white dark:bg-white10 m-0 p-0 mb-[25px] rounded-10 relative">
                  <div className="py-[16px] px-[25px] text-dark dark:text-white87 font-medium text-[17px] border-regular dark:border-white10 border-b">
                    <Heading as="h4" className="text-lg font-medium mb-0">
                      Query your studies here
                    </Heading>
                  </div>
                  <div className="p-[25px]">
                    <DataTable
                      filterOption
                      filterOnchange
                      tableData={tableDataScource}
                      columns={dataTableColumn}
                      rowSelection
                    />
                  </div>
                </div>
              </PaginationStyle>
            </Col>
          </Row>
        </GlobalUtilityStyle>
      </div>
    </>
  );
}

export default DataTables;
