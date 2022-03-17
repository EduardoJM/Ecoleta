import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Home, Login, NotFound } from '../pages';

const AnonStack: React.FC = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default AnonStack;
