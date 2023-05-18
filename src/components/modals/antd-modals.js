import PropTypes, { object } from 'prop-types';
import React, { useEffect } from 'react';
import { ModalStyled } from './styled';
import { Button } from '../buttons/buttons';
import { useDispatch, useSelector } from 'react-redux';
import { setPopupChildren, togglePopup } from '../../redux/globals/actions';
import './customStyle.css';

function Modal() {
  const { showPopup, popupChildren } = useSelector((state) => state.globals);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showPopup === false) {
      dispatch(setPopupChildren(null));
    }
  }, [showPopup]);

  const onClose = () => {
    dispatch(togglePopup(false));
  };
  return (
    <ModalStyled
      visible={showPopup}
      onCancel={onClose}
      // type={color ? type : false}
      footer={<></>}
    >
      {popupChildren}
    </ModalStyled>
  );
}

Modal.propTypes = {
  onCancel: PropTypes.func,
  onOk: PropTypes.func,
  visible: PropTypes.bool,
  title: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  footer: PropTypes.arrayOf(object),
  width: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.node]),
};

const alertModal = ModalStyled;
export { Modal, alertModal };
