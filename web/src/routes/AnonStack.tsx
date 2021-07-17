import React from 'react';
import { Route } from 'react-router-dom';
import { Home, Login } from '../pages';

const AnonStack: React.FC = () => {
    return (
        <>
            <Route component={Home} path="/" exact />
            <Route component={Login} path="/login" exact />
        </>
    );
};

export default AnonStack;
