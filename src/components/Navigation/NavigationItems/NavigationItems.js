import React from 'react';
import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default navigationItems;
