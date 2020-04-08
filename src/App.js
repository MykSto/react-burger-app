import React, { useEffect } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as authAction from 'store/actions/index';

import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Checkout from 'containers/Checkout/Checkout';
import Orders from 'containers/Orders/Orders';
import Auth from 'containers/Auth/Auth';
import Logout from 'containers/Auth/Logout/Logout';

import Layout from './containers/Layout/Layout';

function App(props) {
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
              <Route path="/checkout" component={Checkout} />
              <Route path="/orders" component={Orders} />
              <Route path="/" exact component={BurgerBuilder} />
              {/* <Redirect path="/" /> */}
            </Switch>
          )

          : (
            <Switch>
              <Route path="/auth" component={Auth} />
              <Route path="/" exact component={BurgerBuilder} />
              {/* <Redirect path="/" /> */}
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
