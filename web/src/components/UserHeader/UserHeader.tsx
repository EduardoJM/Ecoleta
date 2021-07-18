import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { UserData } from '../../types';
import { UserContainer, Avatar, Information, TabBarContainer, TabBarItem } from './styles';

interface UserHeaderProps {
    user: UserData | null;
}

const UserHeader: React.FC<UserHeaderProps> = (props) => {
    const { user } = props;
    const { pathname } = useLocation();
    const isPoints = useMemo(() => {
        return pathname.startsWith("/user/points");
    }, [pathname]);
    const isMyProfile = useMemo(() => {
        return !pathname.startsWith("/user/points") && pathname.startsWith("/user");
    }, [pathname]);

    if (!user) {
        return <></>;
    }
    return (
        <>
            <UserContainer>
                <Avatar
                    style={{
                        backgroundImage: `url(${user.avatar})`,
                    }}
                />
                <Information>
                    <h2>Nome vem Aqui</h2>
                    <span>{user.email}</span>
                </Information>
            </UserContainer>
            <TabBarContainer>
                <TabBarItem to="/user" className={isMyProfile ? 'active' : ''}>Meu Perfil</TabBarItem>
                <TabBarItem to="/user/points" className={isPoints ? 'active' : ''}>Meus Pontos de Coleta</TabBarItem>
            </TabBarContainer>
        </>
    );
};

export default UserHeader;
