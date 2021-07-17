import React, { useEffect } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import { actions } from '../redux';
import LoggedStack from './LoggedStack';
import AnonStack from './AnonStack';

//import Points from './pages/Points';
//import { CreatePoint, Login, User } from './pages';
//import SignIn from'./pages/SignIn';
//import PointDashboard from './pages/PointDashboard';

//import { AuthProvider } from './contexts/auth';

const Routes = () => {
    const dispatch = useDispatch();
    const { logged } = useAuth();

    useEffect(() => {
        dispatch(actions.auth.requestCheckIfLogged());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Switch>
                {logged ? <LoggedStack /> : <AnonStack />}
                {/*
                <Route component={Home} path="/" exact />
                <Route component={Login} path="/login" exact />
                <Route component={CreatePoint} path = "/point/new" exact />
                <Route component={User} path = "/user" exact />
                */}

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
