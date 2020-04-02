import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from 'components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from 'containers/Checkout/ContactData/ContactData';

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack();
  };

  const checkoutContinuedHandler = () => {
    props.history.replace('checkout/contact-data');
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    summary = (
      <div>
        <CheckoutSummary
          ingredients={props.ings}
          checkoutContinued={checkoutContinuedHandler}
          checkoutCancelled={checkoutCancelledHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => ({
  ings: state.ingredients,
});

export default connect(mapStateToProps, null)(Checkout);
