import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../hooks';
import { actions } from '../redux';
import LoggedStack from './LoggedStack';
import AnonStack from './AnonStack';

const Routes = () => {
    const dispatch = useDispatch();
    const { logged } = useAuth();

    useEffect(() => {
        dispatch(actions.auth.requestCheckIfLogged());
    }, [dispatch]);


    /*
    <Route component={Home} path="/" exact />
    <Route component={Login} path="/login" exact />
    <Route component={CreatePoint} path = "/point/new" exact />
    <Route component={User} path = "/user" exact />
    */

    /*
    <Route component={Points} path="/points/:uf/:city" />
    <Route component={CreatePoint} path="/create-point" />
    <Route component={SignIn} path="/signin" />
    <Route component={PointDashboard} path="/dashboard" exact />
    <Route component={NotFound} />
    */

    return logged ? <LoggedStack /> : <AnonStack />;
};

export default Routes;
