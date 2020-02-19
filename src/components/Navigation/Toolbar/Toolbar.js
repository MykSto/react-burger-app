import React from 'react';
import Logo from 'components/Logo/Logo';
import NavigationItems from 'components/Navigation/NavigationItems/NavigationItems';
import styles from './Toolbar.module.css';

const toolbar = () => (
  <header className={styles.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
