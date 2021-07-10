import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

//import NotFound from './pages/NotFound';

import Home from './pages/Home';
//import Points from './pages/Points';
import { CreatePoint, Login } from './pages';
//import SignIn from'./pages/SignIn';
//import PointDashboard from './pages/PointDashboard';

//import { AuthProvider } from './contexts/auth';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" exact />
                <Route component={CreatePoint} path = "/point/new" exact />
                {/*
                <Route component={Points} path="/points/:uf/:city" />
                <Route component={CreatePoint} path="/create-point" />
                <Route component={SignIn} path="/signin" />
                <Route component={PointDashboard} path="/dashboard" exact />
                <Route component={NotFound} />
                */}
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
