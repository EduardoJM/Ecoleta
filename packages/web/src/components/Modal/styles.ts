import styled from 'styled-components';
import { animated } from 'react-spring';

export const Overlay = styled(animated.div)`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 5000;
    background: rgba(0, 0, 0, 0.9);
    color: #FFF;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 100px;
    text-align: center;
    padding: 20px;

    .close-button {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        z-index: 5005;

        background: rgba(0, 0, 0, 0.6);
        border-radius: 25px;

        svg {
            width: 38px;
            height: 38px;
            fill: #FFF;
        }
    }
`;
