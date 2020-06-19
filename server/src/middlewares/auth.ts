import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

interface DecodedJWT {
    id: number;
}

function authHandler (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        return response.status(401).send({
            error: true,
            information: {
                in: 'auth',
                code: 'NO_TOKEN',
                message: 'No token provided',
            }
        });
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return response.status(401).send({
            error: true,
            information: {
                in: 'auth',
                code: 'INVALID_TOKEN_FORMAT',
                message: 'Invalid token format',
            }
        });
    }

    const [ scheme, token ] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return response.status(401).send({
            error: true,
            information: {
                in: 'auth',
                code: 'INVALID_TOKEN_FORMAT',
                message: 'Invalid token format',
            }
        });
    }

    jwt.verify(token, authConfig.appHash, (err, decoded) => {
        if (err) {
            return response.status(401).send({
                error: true,
                information: {
                    in: 'auth',
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token',
                }
            });
        }
        //request.pointId = (decoded as DecodedJWT).id;
        return next();
    });
}

export default authHandler;
