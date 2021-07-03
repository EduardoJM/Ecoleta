import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { httpStatusCode, outputErrors } from '../constants';
import { generateToken } from '../utils/jwt';

interface UserCreateRequestBody {
    email: string;
    password: string;
    avatar: string;
}

export default class UserController {
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
}
