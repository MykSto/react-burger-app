import React from 'react';
import Aux from 'hoc/Auxiliary';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import styles from './Modal.module.css';

const modal = (props) => (
  <Aux>
    <Backdrop isOrdered={props.isOrdered} clicked={props.modalClosed} />
    <div
      className={styles.Modal}
      style={{
        transform: props.isOrdered ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.isOrdered ? '1' : '0',
      }}
    >
      {props.children}
    </div>
  </Aux>
);

export default modal;
