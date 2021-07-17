import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, CreatePoint, User, UserPoints } from '../pages';

const LoggedStack: React.FC = () => {
    return (
        <>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
            <Route component={CreatePoint} path="/point/new" exact />
            <Route component={User} path="/user" exact />
            <Route component={UserPoints} path="/user/points/" exact />
            <Route component={UserPoints} path="/user/points/:page" exact />
        </>
    );
};

export default LoggedStack;
