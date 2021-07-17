import api from './axios';
import { PointList, UserAuthenticatedData, UserData } from '../../types';

export async function createUser(data: FormData) {
    return api
        .post('/user', data)
        .then((response) => response.data);
}

export async function loginUser(email: string, password: string) : Promise<UserAuthenticatedData> {
    return api
        .post<UserAuthenticatedData>('/auth', { email, password })
        .then((response) => response.data);
}

export async function getMyData() {
    return api.get<UserData>('/user').then(response => response.data);
}

export async function listUserPoints(page: number) {
    return api
        .get<PointList>(`/user/points?page=${page}`)
        .then((response) => response.data);
}
