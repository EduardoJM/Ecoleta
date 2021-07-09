import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Header from '../components/Header';

import './styles/pages.css';

const CreatePoint: React.FC = () => {
    function handleSubmit() {
        console.log('oie');
    }

    return (
        <div className="page-content">
            <Header />

            <form className="styled" onSubmit={handleSubmit}>
                <h1>Cadastro do<br/> ponto de coleta</h1>
            </form>
        </div>
    );
};

export default CreatePoint;
