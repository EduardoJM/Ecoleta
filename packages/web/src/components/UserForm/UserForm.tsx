import React, { ChangeEvent, FormEvent, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import Dropzone from '../Dropzone';
import { actions } from '../../redux';

interface UserFormProps {
    title: string | ReactNode;
    submitButtonText: string;
    onSubmit: (e: FormEvent) => void;
    setSelectedFile: (file: File | null) => void;
    data: {
        name: string;
        email: string;
        password: string;
    }
    setData: (item: 'name' | 'email' | 'password', value: string) => void;
}

const UserForm: React.FC<UserFormProps> = (props) => {
    const {
        onSubmit,
        title,
        setSelectedFile,
        data,
        setData,
        submitButtonText,
    } = props;
    const dispatch = useDispatch();

    function handleImageSelect(file: File) {
        if (file.size >= 1048576) {
            dispatch(actions.global.pushMessage('Tamanho do arquivo deve ser de, no máximo, 1 MB.'));
            return false;
        }
        setSelectedFile(file);
        return true;
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        if (name === 'email' || name === 'password' || name === 'name') {
            setData(name, value);
        }
    }

    return (
        <form className="styled" onSubmit={onSubmit}>
            <h1>{title}</h1>
            <Dropzone onFileUploaded={handleImageSelect} />

            <fieldset>
                <legend>
                    <h2>Dados</h2>
                </legend>

                <div className="field">
                    <label htmlFor="name">Seu Nome</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={handleInputChange}
                        value={data.name}
                    />
                </div>

                <div className="field">
                    <label htmlFor="email">Seu E-mail</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        onChange={handleInputChange}
                        value={data.email}
                    />
                </div>

                <div className="field">
                    <label htmlFor="password">Sua Senha</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={handleInputChange}
                        value={data.password}
                    />
                </div>
            </fieldset>

            <button type="submit">
                {submitButtonText}
            </button>
        </form>
    );
};

export default UserForm;
