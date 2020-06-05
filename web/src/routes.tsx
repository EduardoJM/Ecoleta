import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Points from './pages/Points';
import CreatePoint from './pages/CreatePoint';
import NotFound from './pages/NotFound';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Points} path="/points/:uf/:city" />
                <Route component={CreatePoint} path="/create-point" />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
