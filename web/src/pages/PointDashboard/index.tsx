import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import {useAuth} from '../../contexts/auth';

// TODO: check if is needed add some loading page

// TODO: create the "dashboard"

const PointDashboard = () => {
    const { signed, point, signOut } = useAuth();
    const history = useHistory();

    useEffect(() => {
        if (!signed) {
            history.push('/signin');
        }
    }, [signed, history]);

    console.log(point);

    function handleSignOut() {
        signOut();
    }

    return (
        <div>
            <h2>Dashboard</h2>

            <button onClick={handleSignOut}>Sair</button>
        </div>
    );
};

export default PointDashboard;
