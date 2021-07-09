import React, { useEffect, useState, ChangeEvent, FormEvent, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Store, actions } from '../../redux';
import Header from '../../components/Header';
import LoginBox from '../../components/LoginBox';

import '../styles/pages.css';

const CreatePoint: React.FC = () => {
    const { user } = useSelector((store: Store) => store.auth);
    const logged = useMemo(() => user !== null, [user]);

    return (
        <div className="page-content">
            <Header />

            {logged ? (
                <h1>Você criara o ponto agora</h1>
            ) : (
                <LoginBox />
            )}
        </div>
    );
};

export default CreatePoint;
