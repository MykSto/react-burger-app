import React from 'react';
import burgerLogo from 'components/assets/images/burger-logo.png';
import styles from './Logo.module.css';


const logo = (props) => (
  <div className={styles.Logo}>
    <img alt="logo" src={burgerLogo} />
  </div>
);

export default logo;
