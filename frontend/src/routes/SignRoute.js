import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

export const SignRoute = ({
    IsAuthentication,
    children
}) => (
    IsAuthentication ?
    <Navigate to="/" /> :
    children
);

const mapStateToProps = (state) =>({
    IsAuthentication: !!state.auth.uname
});

export default connect(mapStateToProps)(SignRoute);