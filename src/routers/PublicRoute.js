import React from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

export const PublicRoute = ({
    component: Component, 
    ...rest 
}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <Redirect to='/dashboard'/> // When user is authenticated, automatically redirect user to DashboardPage
            ) : (
                <Component {...props}/>
            )
        )}/>
    )
};

export default PublicRoute;

