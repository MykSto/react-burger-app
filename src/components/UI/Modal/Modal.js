/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import Aux from 'hoc/Auxiliary';
import Backdrop from 'components/UI/Backdrop/Backdrop';
import styles from './Modal.module.css';

class Modal extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.isOrdered !== this.props.isOrdered;
  }

  UNSAFE_componentWillUpdate() {
    console.log('[Modal] will update');
  }

  render() {
    return (
      <Aux>
        <Backdrop isOrdered={this.props.isOrdered} clicked={this.props.modalClosed} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.isOrdered ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.isOrdered ? '1' : '0',
          }}
        >
          {this.props.children}
        </div>
      </Aux>
    );
  }
}

export default Modal;
