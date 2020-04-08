import React, { useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
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
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onLocalStorageToken: () => dispatch(authAction.authCheckState()),
});

export default withRouter(connect(null, mapDispatchToProps)(App));
