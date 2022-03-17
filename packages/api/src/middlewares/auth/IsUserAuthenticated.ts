import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../../utils/jwt';
import { httpStatusCode, outputErrors } from '../../constants';

interface DecodedJWT {
    id: number;
}

export default function IsUserAuthenticated (
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        return response
            .status(httpStatusCode.HTTP_401_UNAUTHORIZED)
            .json(outputErrors.responses.AUTH_NO_TOKEN);
    }
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
        return response
            .status(httpStatusCode.HTTP_401_UNAUTHORIZED)
            .json(outputErrors.responses.AUTH_INVALID_TOKEN);
    }
    const [ scheme, token ] = parts;
    if (!/^Bearer$/i.test(scheme)) {
        return response
            .status(httpStatusCode.HTTP_401_UNAUTHORIZED)
            .json(outputErrors.responses.AUTH_INVALID_TOKEN);
    }

    verifyToken(token, (err, decoded: DecodedJWT) => {
        if (err) {
            return response
                .status(httpStatusCode.HTTP_401_UNAUTHORIZED)
                .json(outputErrors.responses.AUTH_EXPIRED_TOKEN);
        }
        request.user = { id: decoded.id };
        return next();
    });
}
