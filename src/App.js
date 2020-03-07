import React from 'react';
import BurgerBuilder from 'containers/BurgerBuilder/BurgerBuilder';
import Checkout from 'containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from 'containers/Orders/Orders';
import Layout from './containers/Layout/Layout';

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
