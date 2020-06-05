import React from 'react';

import Header from '../../components/Header';

import './styles.css';

const NotFound = () => {
    return (
        <div id="page-notfound">
            <Header />

            <div className="content">
                <h1>Ops!</h1>
                <h3>Parece que o conteúdo procurado não foi encotrado.</h3>
            </div>
        </div>
    )
};

export default NotFound;
