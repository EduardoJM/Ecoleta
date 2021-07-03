import jwt from 'jsonwebtoken';
import config from '../config';

export function generateToken (params : any = {}) : string {
    return jwt.sign(params, config.jwtSecret, {
        expiresIn: config.jwtExpires,
    });
};
