import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../../container/dashboard'));
const DemoTwo = lazy(() => import('../../container/dashboard/DemoTwo'));
const DemoThree = lazy(() => import('../../container/dashboard/DemoThree'));
const DemoFour = lazy(() => import('../../container/dashboard/DemoFour'));
const NotFound = lazy(() => import('../../container/pages/404'));

function DashboardRoutes() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
      <Route path="demo-2" element={<DemoTwo />} />
      <Route path="demo-3" element={<DemoThree />} />
      <Route path="demo-4" element={<DemoFour />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default DashboardRoutes;
