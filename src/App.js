import React, { useEffect } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from 'store/actions/index';
import asyncComponent from 'hoc/asyncComponent/asyncComponent';

import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
// import Checkout from 'containers/Checkout/Checkout';
// import Orders from 'containers/Orders/Orders';
// import Auth from 'containers/Auth/Auth';
import Logout from 'containers/Auth/Logout/Logout';

import Layout from './containers/Layout/Layout';

const asyncCheckout = asyncComponent(()=>{
  return import('containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(()=>{
  return import('containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
  return import('containers/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.onLocalStorageToken();
  });

  return (
    <div>
      <Layout>
        { props.token
          ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/orders" component={asyncOrders} />
              <Route path="/auth" component={asyncAuth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )

          : (
            <Switch>
              <Route path="/auth" component={asyncAuth} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}

      </Layout>
    </div>
  );
}

const mapStateToProps = (state) => ({
  token: state.auth.token !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onLocalStorageToken: () => dispatch(authAction.authCheckState()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
