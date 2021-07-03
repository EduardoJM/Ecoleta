import jwt from 'jsonwebtoken';
import config from '../config';

export function generateToken(params : any = {}): string {
    return jwt.sign(params, config.jwtSecret, {
        expiresIn: config.jwtExpires,
    });
};

export function verifyToken(
    token: string,
    callback: (err: any, decoded: any) => void
) {
    jwt.verify(token, config.jwtSecret, callback);
}
