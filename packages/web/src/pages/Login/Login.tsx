import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { actions } from '../../redux';
import { parseSearch } from '../../utils/search';

import '../styles/pages.css';
import './styles.css';

const Login: React.FC = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { search } = useLocation();
    const history = useHistory();

    function handleSignIn(e: FormEvent) {
        e.preventDefault();
        const parsed = parseSearch(search);
        if (Object.prototype.hasOwnProperty.call(parsed, 'next')) {
            dispatch(actions.auth.requestLogin(email, password, {
                next: parsed['next'],
                history,
            }));
        } else {
            dispatch(actions.auth.requestLogin(email, password, { history }));
        }
    };

    return (
        <div className="page-content">
            <Header />

            <form className="styled login-box" onSubmit={handleSignIn}>
                <fieldset>
                    <legend>
                        <h2>Entrar</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </fieldset>

                <button type="submit">Logar</button>
            </form>
        </div>
    );
};

export default Login;
