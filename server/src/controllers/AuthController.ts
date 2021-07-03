import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities';
import { httpStatusCode, outputErrors } from '../constants';
import { generateToken } from '../utils/jwt';

interface AuthRequestBody {
    email: string;
    password: string;
}

class AuthController {
    static async login(request: Request<any, any, AuthRequestBody>, response: Response) {
        const { email, password } = request.body;
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ where: { email } });
        if (!user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.EMAIL_NOT_REGISTERED);
        }
        if (!user.checkIfUnencryptedPasswordIsValid(password)) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.WRONG_PASSWORD);
        }
        const token = generateToken({ id: user.id });

        return response.send({
            user: user.serialize(request),
            token,
        });
    }

    /*
    static async index(request: Request<any, any, AuthRequestBody>, response: Response) {
        const { email, password } = request.body;
        const [point] = await knex('points').where('email', email);
        if (!point) {
            return response.status(400)
                .json({
                    error: true,
                    information: {
                        in: 'auth',
                        code: 'EMAIL_NOT_REGISTERED',
                        message: 'The e-mail is not registered.',
                    },
                });
        }
        if (!await bcrypt.compare(password, point.password)) {
            return response.status(400)
                .json({
                    error: true,
                    information: {
                        in: 'auth',
                        code: 'WRONG_PASSWORD',
                        message: 'The password is wrong.',
                    },
                });
        }
        const token = generateToken({ id: point.id });

        const serializedPoint = {
            ...point,
            password: undefined,
            image_url: `http://10.0.0.103:3333/uploads/images/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', point.id)
            .select('items.title', 'items.id');

        return response.json({
            point: serializedPoint,
            items,
            token,
        });
    }
    */
}

export default AuthController;
