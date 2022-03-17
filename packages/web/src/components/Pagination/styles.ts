import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const PaginationItem = styled(Link)`
    padding: 10px;
    border-radius: 8px;
    text-decoration: none;

    &:not(.active) {
        background: #FFF;
        color: var(--title-color);
    }

    &.active {
        background: var(--primary-color);
        color: #FFF;
    }

    &:not(:last-child) {
        margin-right: 10px;
    }
`;
