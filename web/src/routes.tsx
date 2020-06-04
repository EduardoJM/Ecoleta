import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import Points from './pages/Points';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    // TODO: insert an 404 page
    return (
        <BrowserRouter>
            <Route component={Home} path="/" exact />
            <Route component={Points} path="/points/:uf/:city" />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
    //<Route component={HomeFindPoint} path="/find/:uf/:city" exact />
}

export default Routes;
