import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
//import { useTransition, animated } from 'react-spring';

import './styles.css';

interface ModalProps {
    opened: boolean;
    handleClose: () => void;
    hasCloseButton: boolean;
}

export const useModal = (initialMode: boolean = false) => {
    const [modalOpen, setModalOpen] = useState(initialMode);

    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);
    const toggle = () => setModalOpen(!modalOpen);

    return { modalOpen, open, close, toggle }
}

const Modal: React.FC<ModalProps> = ({
    opened,
    children,
    handleClose,
    hasCloseButton
}) => {
    /*
    const modalTransition = useTransition(opened, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });
    */

    return (
        <>
            {/*modalTransition.map(
                ({ item, key, props }) => item && (
                    <animated.div
                        className="overlay"
                        key={key}
                        style={props}
                    >
                        {hasCloseButton && (
                            <div className="close-button" onClick={handleClose}>
                                <FiX />
                            </div>
                        )}
                        {children}
                    </animated.div>
                )
            )*/}
        </>
    );
};

export default Modal;
