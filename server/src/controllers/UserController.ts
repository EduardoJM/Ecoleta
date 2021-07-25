import { Request, Response } from 'express';
import { Query } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { Point, User } from '../entities';
import { httpStatusCode, outputErrors } from '../constants';
import { generateToken } from '../utils/jwt';
import config from '../config';

interface UserCreateRequestBody {
    name: string;
    email: string;
    password: string;
    avatar: string;
}

interface UserPointsRequestParams extends Query {
    page: string;
}

export default class UserController {
    static async points(request: Request<any, any, any, UserPointsRequestParams>, response: Response) {
        if (!request.user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.USER_NOT_FOUND);
        }
        const pointsRepo = getRepository(Point);

        const count = await pointsRepo.count({
            where: { user: request.user.id },
        });
        let pages = Math.ceil(count / config.paginationItems);
        if (pages === 0) {
            pages = 1;
        }
        let page = 1;
        if (request.query.page) {
            page = parseInt(request.query.page, 10);
            if (page <= 0 || page > pages) {
                return response
                    .status(httpStatusCode.HTTP_404_NOT_FOUND)
                    .json(outputErrors.responses.PAGE_NOT_FOUND);
            }
        }
        const results = await pointsRepo.find({
            where: { user: request.user.id },
            order: {
                created_at: 'DESC',
            },
            relations: ['items', 'items.item'],
            skip: (page - 1) * config.paginationItems,
            take: config.paginationItems,
        });

        return response.json({
            results: results.map((item) => item.serialize(request)),
            page,
            pagesCount: pages,
        });
    }

    static async create(request: Request<any, any, UserCreateRequestBody>, response: Response) {
        const {email, password, avatar} = request.body;

        const userRepo = getRepository(User);
        const alreadyRegistered = await userRepo.findOne({
            where: { email },
            select: ['id']
        });
        if (alreadyRegistered) {
            return response
                .status(httpStatusCode.HTTP_409_CONFLICT)
                .json(outputErrors.responses.EMAIL_ALREADY_REGISTERED);
        }
        const user = new User();
        user.email = email;
        user.avatar = avatar;
        user.password = password;
        user.hashPassword();
        
        try {
            const result = await userRepo.save(user);
            const token = generateToken({ id: result.id });
            return response
                .status(httpStatusCode.HTTP_201_CREATED)
                .json({
                    user: result.serialize(request),
                    token,
                });
        } catch (e) {
            return response
                .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                .json(outputErrors.responses.UNKNOWN_SAVE_ERROR);
        }
    }

    static async getMyData(request: Request, response: Response) {
        if (!request.user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.USER_NOT_FOUND);
        }
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ where: { id: request.user.id } });
        if (!user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.USER_NOT_FOUND);
        }
        return response.send({
            ...user.serialize(request),
        });
    }
}
