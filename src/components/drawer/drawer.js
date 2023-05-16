import { Radio } from 'antd';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { DrawerStyle } from './style';
import { Button } from '../buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer, setDrawerChildren } from '../../redux/globals/actions';

const RadioGroup = Radio.Group;

function Drawer() {
  const { drawer, drawerChildren } = useSelector((state) => state.globals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (drawer === false) {
      dispatch(setDrawerChildren(null));
    }
  }, [drawer]);

  const onClose = () => {
    dispatch(setDrawer(false));
  };

  return (
    <DrawerStyle placement={'right'} closable={false} onClose={onClose} open={drawer}>
      {drawerChildren}
    </DrawerStyle>
  );
}

export { Drawer };
