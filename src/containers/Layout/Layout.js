import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from 'hoc/Auxiliary';
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerisVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerisVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    setSideDrawerisVisible(!sideDrawerIsVisible);
  };


  return (
    <Aux>
      <Toolbar isAuth={props.token} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer isAuth={props.token} open={sideDrawerIsVisible} closed={sideDrawerClosedHandler} />
      <main className={styles.Content}>
        {props.children}
      </main>
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  token: state.auth.token !== null,
});

export default connect(mapStateToProps, null)(Layout);
