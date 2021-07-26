import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { actions } from '../../redux';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(actions.auth.requestLogout(history));
    }, [dispatch, history]);

    return <></>;
};

export default Logout;
