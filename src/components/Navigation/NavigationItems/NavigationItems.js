import React from 'react';
import NavigationItem from 'components/Navigation/NavigationItems/NavigationItem/NavigationItem';
import styles from './NavigationItems.module.css';

const navigationItems = () => (
  <ul className={styles.NavigationItems}>
    <NavigationItem link="/" active>Burger Builder</NavigationItem>
    <NavigationItem link="/">Contacts</NavigationItem>
  </ul>
);

export default navigationItems;
