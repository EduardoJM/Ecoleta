import api from './axios';
import { CollectItem } from '../../types';

export async function getItems(): Promise<CollectItem[]> {
    return api
        .get<CollectItem[]>('/items')
        .then((response) => response.data);
}
