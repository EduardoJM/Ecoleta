import React from 'react';
import Header from '../../components/Header';
import LoginBox from '../../components/LoginBox';

import '../styles/pages.css';

const Login: React.FC = () => {
    return (
        <div className="page-content">
            <Header />
            <LoginBox />
        </div>
    );
};

export default Login;
