import api from './axios';
import { UserAuthenticatedData, UserData } from '../../types';

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

export function getMyData() {
    return api.get<UserData>('/user').then(response => response.data);
}
