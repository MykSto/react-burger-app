import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as logAction from 'store/actions/index';

const Logout = (props) => {
  useEffect(() => {
    props.onLogout();
  }, []);

  return (
    <Redirect to="/" />
  );
};

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => dispatch(logAction.logOut()),
});

export default connect(null, mapDispatchToProps)(Logout);
