import React, { useEffect, Suspense } from 'react';
import {
  Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from 'store/actions/index';

import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Logout from 'containers/Auth/Logout/Logout';

import Layout from './containers/Layout/Layout';

const Checkout = React.lazy(()=>{
  return import('containers/Checkout/Checkout');
});

const Orders = React.lazy(()=>{
  return import('containers/Orders/Orders');
});

const Auth = React.lazy(()=>{
  return import('containers/Auth/Auth');
});

const App = (props) => {
  useEffect(() => {
    props.onLocalStorageToken();
  });

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
        { props.token
          ? (
            <Switch>
              <Route path="/logout" component={Logout} />
              <Route path="/checkout" render={() => <Checkout />} />
              <Route path="/orders" render={() => <Orders />} />
              <Route path="/auth" render={() => <Auth />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )

          : (
            <Switch>
              <Route path="/auth" render={() => <Auth />} />
              <Route path="/" exact component={BurgerBuilder} />
              <Redirect to="/" />
            </Switch>
          )}
        </Suspense>
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
