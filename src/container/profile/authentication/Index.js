import { Spin } from 'antd';
import React, { Suspense } from 'react';
import logoImg from '../../../static/img/dicomx-logo-new.svg';

const AuthLayout = (WraperContent) => {
  return function () {
    return (
      <Suspense
        fallback={
          <div className="spin flex items-center justify-center h-[calc(100vh-132px)]">
            <Spin />
          </div>
        }
      >
        <div
          style={{ backgroundImage: `url("${require('../../../static/img/admin-bg-light.png')}")` }}
          className="bg-top bg-no-repeat"
        >
          <div className="py-[50px] 2xl:py-[50px] px-[50px]">
            <div className="flex justify-center mb-5">
              <img className="dark:hidden w-40" src={logoImg} alt="DICOM-X logo" />
            </div>

            <WraperContent />
          </div>
        </div>
      </Suspense>
    );
  };
};

export default AuthLayout;
