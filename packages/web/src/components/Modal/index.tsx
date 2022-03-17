import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';
import { useTransition } from 'react-spring';
import { Overlay } from './styles';

interface ModalProps {
    opened: boolean;
    handleClose: () => void;
    hasCloseButton: boolean;
}

// TODO: MOVE TO /hooks, rename useModalStates
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
    const modalTransitions = useTransition(opened, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 }
    });

    return (
        <>
            {modalTransitions((props, item) => item && (
                <Overlay
                    className="overlay"
                    style={props}
                >
                    {hasCloseButton && (
                        <div className="close-button" onClick={handleClose}>
                            <FiX />
                        </div>
                    )}
                    {children}
                </Overlay>
            ))}
        </>
    );
};

export default Modal;
