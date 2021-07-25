import { Request, Response, NextFunction } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { httpStatusCode, outputErrors } from '../../constants';
import { Point } from '../../entities';

interface Params extends ParamsDictionary {
    id: string;
}

export default async function UserIsPointOwner (
    request: Request<Params, any, any>,
    response: Response,
    next: NextFunction
) {
    if (!request.user) {
        return response
            .status(httpStatusCode.HTTP_404_NOT_FOUND)
            .json(outputErrors.responses.USER_NOT_FOUND);
    }
    const id = parseInt(request.params.id, 10);
    if (Number.isNaN(id) || !Number.isFinite(id)) {
        return response
            .status(httpStatusCode.HTTP_400_BAD_REQUEST)
            .json(outputErrors.responses.INVALID_POINT_ID);
    }
    const pointRepo = getRepository(Point);
    const point = await pointRepo.findOne({ where: { id: id }, relations: ['user'], select: ['id', 'user'] });
    if (!point) {
        return response
            .status(httpStatusCode.HTTP_404_NOT_FOUND)
            .json(outputErrors.responses.POINT_NOT_FOUND);
    }
    if (point.user.id !== request.user.id) {
        return response
            .status(httpStatusCode.HTTP_401_UNAUTHORIZED)
            .json(outputErrors.responses.AUTH_POINT_NO_ACCESS);
    }
    return next();
}
