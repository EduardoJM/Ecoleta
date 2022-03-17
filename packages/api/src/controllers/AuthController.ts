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
}

export default AuthController;
