import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

const generateToken = (params = {}) => {
    return jwt.sign(params, authConfig.appHash, {
        expiresIn: 86400,
    });
};

export default generateToken;
