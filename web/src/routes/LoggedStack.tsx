import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Login, Logout, CreatePoint, User, UserPoints, NotFound } from '../pages';

const LoggedStack: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" exact />
                <Route component={Logout} path="/logout" exact />
                <Route component={CreatePoint} path="/point/new" exact />
                <Route component={User} path="/user" exact />
                <Route component={UserPoints} path="/user/points/" exact />
                <Route component={UserPoints} path="/user/points/:page" exact />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default LoggedStack;
