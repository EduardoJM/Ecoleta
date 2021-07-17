import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

//import NotFound from './pages/NotFound';

import Home from './pages/Home';
//import Points from './pages/Points';
import { CreatePoint, Login } from './pages';
//import SignIn from'./pages/SignIn';
//import PointDashboard from './pages/PointDashboard';

//import { AuthProvider } from './contexts/auth';

import { actions } from './redux'

const Routes = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.auth.requestCheckIfLogged());
    }, [dispatch]);

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
