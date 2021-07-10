import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from '../../redux';
import MessageHub from './MessageHub';

import './styles.css';

const GlobalDisplay: React.FC = () => {
    const { loadingCount } = useSelector((store: Store) => store.global);
    

    return (
        <>
            {loadingCount > 0 && (
                <div className="page-loader">
                    <div>
                        <span>Carregando...</span>
                    </div>
                </div>
            )}
            <MessageHub />
        </>
    );
};

export default GlobalDisplay;
