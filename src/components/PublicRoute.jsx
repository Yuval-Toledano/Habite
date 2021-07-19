import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    const { isLogin } = useAuth();
    return (
        <Route {...rest} render={props => (
            isLogin() && restricted ?
                <Redirect to="/signin" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;