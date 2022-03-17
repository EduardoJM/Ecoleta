import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks';
import { Page, TabContent } from '../../styles';
import Header from '../../components/Header';
import UserHeader from '../../components/UserHeader';
import UserForm from '../../components/UserForm';
import { actions } from '../../redux';

const User: React.FC = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [data, setData] = useState<{
        name: string;
        password: string;
        email: string;
    }>({
        name: user ? user.name : '',
        password: '',
        email: user ? user.email : '',
    });
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    function handleSubmit(e: FormEvent) {
        if (!user) {
            dispatch(actions.global.pushMessage('Não foi possível completar a requisição.'));
            return;
        }
        e.preventDefault();
        const frm = new FormData();
        if (data.name !== '' && data.name !== user.name) {
            frm.append('name', data.name);
        }
        if (data.email !== '' && data.email !== user.email) {
            frm.append('email', data.email);
        }
        if (data.password !== '') {
            frm.append('password', data.password);
        }
        if (selectedFile) {
            frm.append('avatar', selectedFile);
        }
        dispatch(actions.user.requestUpdateUser(frm));
    }

    function handleSetData(item: 'name' | 'email' | 'password', value: string) {
        setData((old) => {
            return {
                ...old,
                [item]: value,
            };
        });
    }

    if (!user) {
        return <></>;
    }
    return (
        <Page>
            <Header />
            <UserHeader user={user} />

            <TabContent>
                <UserForm
                    onSubmit={handleSubmit}
                    data={data}
                    setData={handleSetData}
                    setSelectedFile={setSelectedFile}
                    title="Deseja Alterar Seus Dados?"
                    submitButtonText="Alterar Meus Dados"
                />
            </TabContent>
        </Page>
    );
};

export default User;
