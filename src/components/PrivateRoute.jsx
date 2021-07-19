import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({component: Component, ...rest}) => {
    const { isLogin } = useAuth();
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

export default PrivateRoute;