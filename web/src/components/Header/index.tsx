import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logo from '../../assets/logo.svg';

const Header = () => {
    return (
        <header>
            <img src={logo} alt="Ecoleta"/>

            <Link to="/">
                <FiArrowLeft />
                Voltar para home
            </Link>
        </header>
    );
};

export default Header;
