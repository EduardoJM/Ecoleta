import styled from 'styled-components';

export const PointItem = styled.div`
    padding: 10px;

    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
    }

    h2 {
        font-size: 36px;
        margin-bottom: 10px;
    }

    h3 {
        color: var(--primary-color);
        font-size: 24px;
        margin-bottom: 20px;
    }

    p {
        margin-bottom: 20px;
    }

    .fake-link {
        color: var(--title-color);
        cursor: pointer;
    }

    .contact {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        .button {
            flex: 0 0 calc(50% - 20px);
            height: 50px;
            background: var(--primary-color);
            border-radius: 8px;
            text-decoration: none;

            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            color: #FFF;

            svg {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }

            &:hover {
                background: #2FB86E;
                cursor: pointer;
            }
        }
    }
`;

export const PointsNotFound = styled.div`
    min-height: 300px;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const PointsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;

    @media (max-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 650px) {
        grid-template-columns: 1fr;
    }
`;

export const PreviewMapContainer = styled.div`
    width: 100%;
    height: 100%;

    .leaflet-container {
        width: 100%;
        height: 100%;
    }
`;
