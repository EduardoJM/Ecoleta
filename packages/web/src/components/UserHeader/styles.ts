import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const UserContainer = styled.div`
    padding: 60px 10px;
    display: flex;
    flex-direction: row;
    align-items: stretch;

    @media (max-width: 550px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
    }
`;

export const Avatar = styled.div`
    width: 128px;
    height: 128px;
    border-radius: 64px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    margin-right: 20px;

    @media (max-width: 550px) {
        margin-right: 0;
        margin-bottom: 20px;
    }
`;

export const Information = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
`;

export const TabBarContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

export const TabBarItem = styled(Link)`
    flex: 0 0 50%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    text-decoration: none;
    font-size: 18px;
    
    &:not(.active) {
        color: var(--title-color);
    }
    &.active {
        color: var(--primary-color);
        font-weight: bold;
        background: #FFF;
        border-radius: 5px 5px 0 0;
    }
`;
