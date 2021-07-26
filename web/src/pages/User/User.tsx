import React from 'react';
import { useAuth } from '../../hooks';
import { Page, TabContent } from '../../styles';
import Header from '../../components/Header';
import UserHeader from '../../components/UserHeader';

const User: React.FC = () => {
    const { user } = useAuth();

    if (!user) {
        return <></>;
    }
    return (
        <Page>
            <Header />
            <UserHeader user={user} />

            <TabContent>
                <h2>{user.name}</h2>
                <span>{user.email}</span>
            </TabContent>
        </Page>
    );
};

export default User;
