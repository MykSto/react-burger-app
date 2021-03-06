import React from 'react';
import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = (props) => (
  <ul onClick={props.clicked} className={styles.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    { props.isAuth && <NavigationItem link="/orders">Orders</NavigationItem> }
    { !props.isAuth
      ? <NavigationItem link="/auth">Auth</NavigationItem>
      : <NavigationItem link="/logout">Logout</NavigationItem> }
  </ul>
);

export default navigationItems;
