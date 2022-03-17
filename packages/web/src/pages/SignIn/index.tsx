import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import { useAuth } from '../../contexts/auth';

import './styles.css';

// TODO: make the styles of this page

const SignIn = () => {
    const { signIn, signed } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const history = useHistory();

    useEffect(() => {
        if (signed) {
            history.push('/dashboard');
        }
    }, [signed, history]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    async function handleSignIn(event: FormEvent) {
        event.preventDefault();
        const { email, password } = formData;
        signIn(email, password);
    }

    return (
        <div id="page-signin">
            <Header />

            <form className="styled" onSubmit={handleSignIn}>
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
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="name">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                        />
                    </div>
                </fieldset>

                <button type="submit">Logar</button>
            </form>
        </div>
    );
};

export default SignIn;
