import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from 'hoc/Auxiliary';
import Toolbar from 'components/Navigation/Toolbar/Toolbar';
import SideDrawer from 'components/Navigation/SideDrawer/SideDrawer';

import styles from './Layout.module.css';


const Layout = (props) => {
  const [state, setState] = useState({
    showSideDrawer: false,
  });

  const sideDrawerClosedHandler = () => {
    setState({
      showSideDrawer: false,
    });
  };

  const sideDrawerToggleHandler = () => {
    setState((prevState) => ({
      showSideDrawer: !prevState.showSideDrawer,
    }));
  };


  return (
    <Aux>
      <Toolbar isAuth={props.token} drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer isAuth={props.token} open={state.showSideDrawer} closed={sideDrawerClosedHandler} />
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
