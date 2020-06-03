import React from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';

interface MessageOverlayProps {
    colorClass?: string;
    icon?: JSX.Element;
    automaticRedirect?: boolean,
    redirectDelay?: number,
    redirectPath?: string,
}

const MessageOverlay: React.FC<MessageOverlayProps> = (props) => {
    const color = props.colorClass ? props.colorClass : "white";

    const history = useHistory();

    if (props.automaticRedirect && props.redirectDelay && props.redirectPath) {
        setTimeout(() => {
            const path = props.redirectPath ? props.redirectPath : '/';
            history.push(path);
        }, props.redirectDelay);
    }

    return (
        <div className="overlay">
            {props.icon && (
                <div className={`icon-area ${color}-icon`}>
                    {props.icon}
                </div>
            )}
            <div className="text-area">
                {props.children}
            </div>
        </div>
    )
};

export default MessageOverlay;
