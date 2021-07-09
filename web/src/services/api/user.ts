import api from './axios';
import { UserAuthenticatedData } from '../../types';

export function createUser(data: FormData) {
    return api
        .post('/user', data)
        .then((response) => response.data);
}

export function loginUser(email: string, password: string) : Promise<UserAuthenticatedData> {
    return api
        .post<UserAuthenticatedData>('/auth', { email, password })
        .then((response) => response.data);
}
