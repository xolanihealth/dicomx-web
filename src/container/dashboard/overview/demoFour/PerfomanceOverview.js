import React from 'react';
import { NavLink } from 'react-router-dom';
import UilPrint from '@iconscout/react-unicons/icons/uil-print';
import UilBookOpen from '@iconscout/react-unicons/icons/uil-book-open';
import UilFileAlt from '@iconscout/react-unicons/icons/uil-file-alt';
import UilFile from '@iconscout/react-unicons/icons/uil-file';
import UilTimes from '@iconscout/react-unicons/icons/uil-times';
import { Cards } from '../../../../components/cards/frame/cards-frame';
import DoughnutChart from '../../../../components/charts/DoughnutChart';
import { BorderLessHeading, ChartPointHorizontal } from '../../../styled';

const PerformanceOverview = React.memo(() => {
  const moreContent = (
    <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4">
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilPrint className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Printer</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilBookOpen className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>PDF</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilFileAlt className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Google Sheets</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilTimes className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>Excel (XLSX)</span>
      </NavLink>
      <NavLink
        className="flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active"
        to="#"
      >
        <UilFile className="w-3.5 h-3.5 ltr:mr-2 rtl:ml-2" />
        <span>CSV</span>
      </NavLink>
    </div>
  );
  const labels = ['In Progress', 'Target', 'Completed'];

  const options = {
    cutout: 70,
    maintainAspectRatio: false,
    responsive: false,
    borderWidth: 2,
    borderColor: 'transparent',
    plugins: {
      legend: {
        display: false,
      },
    },
    tooltips: {},
  };

  const datasets = [
    {
      data: [10, 60, 30],
      backgroundColor: ['#FA8B0C', '#8231D3', '#00E4EC'],
      centerText: '',
      centerTextLabel: 'Completed',
    },
  ];

  return (
    <BorderLessHeading>
      <Cards more={moreContent} title="Performance Overview" size="large">
        <>
          <DoughnutChart labels={labels} datasets={datasets} width={180} height={180} option={options} />
          <ChartPointHorizontal>
            <div className="ninjadash-chartpoint">
              {datasets[0].data.map((value, index) => {
                return (
                  <div className="ninjadash-chartpoint__item" key={index}>
                    <span
                      className="ninjadash-chartpoint__tika"
                      style={{
                        backgroundColor: datasets[0].backgroundColor[index],
                      }}
                    />
                    <span className="ninjadash-chartpoint__label">{labels[index]}</span>
                  </div>
                );
              })}
            </div>
          </ChartPointHorizontal>
        </>
      </Cards>
    </BorderLessHeading>
  );
});

export default PerformanceOverview;
