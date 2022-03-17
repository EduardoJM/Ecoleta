import { Request } from 'express';
import config from '../config';

export function buildUrl(request: Request, path: string) {
    const {protocol, hostname} = request;
    const {port} = config;
    return `${protocol}://${hostname}:${port}/${path}`;
}
