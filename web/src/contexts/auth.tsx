import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useHistory } from 'react-router-dom';

interface AuthContextData {
    signed: boolean;
    point: object | null;
    items: object[];
    signIn(email: string, password: string): Promise<void>;
    signOut(): void;
};
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface LoginResult {
    point: object;
    items: object[];
    token: string;
}

export const AuthProvider: React.FC = ({ children }) => {
    const [point, setPoint] = useState<object | null>(null);
    const [items, setItems] = useState<object[]>([]);
    const history = useHistory();

    async function signIn(email: string, password: string) {
        const signInData = {
            email,
            password,
        };
        const result = await api.post<LoginResult>('http://localhost:3333/authenticate', signInData);
        setPoint(result.data.point);
        setItems(result.data.items);

        api.defaults.headers.Authorization = `Bearer ${result.data.token}`;

        localStorage.setItem('@EcoletaAuth:point', JSON.stringify(result.data.point));
        localStorage.setItem('@EcoletaAuth:items', JSON.stringify(result.data.items));
        localStorage.setItem('@EcoletaAuth:token', result.data.token);

        history.push('/dashboard');
    }

    function signOut() {
        setPoint(null);
        localStorage.clear();
        api.defaults.headers.Authorization = undefined;
        
        history.push('/signin');
    }

    useEffect(() => {
        const storagedPoint = localStorage.getItem('@EcoletaAuth:point');
        const storagedItems = localStorage.getItem('@EcoletaAuth:items');
        const storagedToken = localStorage.getItem('@EcoletaAuth:token');
        if (storagedPoint && storagedItems && storagedToken) {
            api.defaults.headers.Authorization = `Bearer ${storagedToken}`;

            setPoint(JSON.parse(storagedPoint));
            setItems(JSON.parse(storagedItems));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ signed: !! point, items, point, signIn, signOut }}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthContext;

export function useAuth() {
    const context = useContext(AuthContext);

    return context;
}
