import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import LoginPage from '../components/LoginPage';
import SignupPage from '../components/SignUpPage';
import ForgotPasswordPage from '../components/ForgotPasswordPage';
import OAuthLink from '../components/OAuthLink';
import DashboardPage from '../components/DashboardPage';

export const history = createBrowserHistory();

const AppRouter = () => (
    <Router history={history}>
        <Switch>  {/* <Switch> looks through its children <Route>s and renders the first one that matches the current URL. */}
            <PublicRoute exact path="/" component={LoginPage}/>
            <PublicRoute path="/signup" component={SignupPage}/>
            <PublicRoute path="/forgot" component={ForgotPasswordPage}/>
            <PrivateRoute path="/oauth" component={OAuthLink}/>
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
        </Switch>
    </Router>
);
  
export default AppRouter;