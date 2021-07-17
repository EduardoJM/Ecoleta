import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Login, CreatePoint, User } from '../pages';

const LoggedStack: React.FC = () => {
    return (
        <>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
            <Route component={CreatePoint} path = "/point/new" exact />
            <Route component={User} path = "/user" exact />
        </>
    );
};

export default LoggedStack;
