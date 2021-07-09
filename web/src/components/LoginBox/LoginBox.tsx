import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../../redux';

import './styles.css';

const LoginBox: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSignIn(e: FormEvent) {
        e.preventDefault();
        dispatch(actions.auth.requestLogin(email, password));
    };

    return (
        <form className="styled login-box" onSubmit={handleSignIn}>
            <fieldset>
                <legend>
                    <h2>Logar</h2>
                    <span>Faça login para poder alterar seus dados cadastrais ou excluir seu ponto de coleta da nossa listagem.</span>
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
    );
};

export default LoginBox;
