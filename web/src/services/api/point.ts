import api from './axios';
import { Point } from '../../types';

export async function createPoint(data: FormData) {
    return api
        .post<Point>('/point', data)
        .then((response) => response.data);
}
