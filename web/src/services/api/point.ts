import api from './axios';
import { Point } from '../../types';

export async function createPoint(data: FormData) {
    return api
        .post<Point>('/point', data)
        .then((response) => response.data);
}

export async function deletePoint(id: number) {
    return api
        .delete(`/point/${id}`)
        .then((response) => response);
}
