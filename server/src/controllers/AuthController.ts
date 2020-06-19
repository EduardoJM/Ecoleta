import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/token';

class AuthController {
    async index(request: Request, response: Response) {
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

        return response.json({
            point: {
                ...point,
                password: undefined,
            },
            token
        });
    }
}

export default AuthController;
