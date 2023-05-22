import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Basic = lazy(() => import('../../container/studies/Table'));
const Studies = lazy(() => import('../../container/studies/Studies'));
const NotFound = lazy(() => import('../../container/pages/404'));

function TableRoute() {
  return (
    <Routes>
      <Route path="/" element={<Studies />} />
      <Route path="basic" element={<Basic />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default TableRoute;
