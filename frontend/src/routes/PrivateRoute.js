import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    IsAuthentication,
    children
}) => (
    IsAuthentication ?
    children :
    <Navigate to="/login" />
);

const mapStateToProps = (state) => ({
    IsAuthentication: !!state.auth.uname
});

export default connect(mapStateToProps)(PrivateRoute);