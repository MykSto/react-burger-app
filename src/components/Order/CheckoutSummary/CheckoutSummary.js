import React from 'react';
import Burger from 'components/Burger/Burger';
import Button from 'components/UI/Button/Button';
import styles from './CheckoutSummary.module.css';

const checkoutSummary = (props) => (
  <div className={styles.CheckoutSummary}>
    <h1>Tastes well?</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button
      clicked={props.checkoutCancelled}
      btnType="Danger"
    >
      CANCEL
    </Button>
    <Button
      btnType="Success"
      clicked={props.checkoutContinued}
    >
      CONTINUE
    </Button>
  </div>
);

export default checkoutSummary;
