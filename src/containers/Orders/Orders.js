import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios-orders';
import * as orderActions from 'store/actions/index';

import Spinner from 'components/UI/Spinner/Spinner';
import withErrorHandler from 'hoc/withErrorHandler/withErrorHandler';

import Order from 'components/Order/Order/Order';

const Orders = (props) => {
  useEffect(() => {
    props.onFetchOrders();
  }, []);


  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));
  }
  return (
    <div>
      {orders}
    </div>
  );
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: () => dispatch(orderActions.fetchOrders()),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
