import React from 'react';
import { useAuth } from '../../hooks';
import { Page } from '../../styles';
import Header from '../../components/Header';
import UserHeader from '../../components/UserHeader';

const User: React.FC = () => {
    const { user } = useAuth();
    
    return (
        <Page>
            <Header />
            <UserHeader user={user} />
        </Page>
    );
};

export default User;
