import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {useAuth} from "../../context/AuthContext"

/**
 * private route component
 */
export default function PrivateRoute({component: Component, ...rest}) {
    const {loadUser} = useAuth();

    return (
        <Route {...rest} render={props => {
           return  loadUser ? <Component {...props} /> : <Redirect to="/login" />
        }} />
    )
}
