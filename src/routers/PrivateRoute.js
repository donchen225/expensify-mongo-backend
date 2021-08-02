import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

const PrivateRoute = ({ 
    component: Component,
    ...rest
}) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Route {...rest} component={(props) => (
            isAuthenticated ? (
                <div>
                    <Header open={open} handleDrawerOpen={handleDrawerOpen}/>
                    <Sidebar open={open} handleDrawerClose={handleDrawerClose}/>
                    <Component {...props}/>
                </div>
            ) : (
                <Redirect to="/"/> // When user is not authenticated, automatically redirect to LoginPage
            )
        )}/>
    )
};

export default PrivateRoute;