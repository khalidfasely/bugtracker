import React from 'react';
import { connect } from 'react-redux';
import { Route, Navigate } from 'react-router-dom';

export const PrivateRoute = ({
    IsAuthentication,
    element: Component,
    ...rest
}) => (
    // Look at the 166th lecture's Q&A to understand the defferent between props1/2
        <Route {...rest} element={(props) => (
            IsAuthentication ? (
                <div>
                    <Component {...props} />
                </div>
            ) : (
                <Navigate to="/" />
            )
        )} />
);

const mapStateToProps = (state) => ({
    IsAuthentication: !!state.auth.uname
});

export default connect(mapStateToProps)(PrivateRoute);