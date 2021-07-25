import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { getRepository } from 'typeorm';
import { User } from '../../entities';
import { httpStatusCode, outputErrors } from '../../constants';

interface RequestBody {
    email?: string;
}

const UserUpdateAvatarUploadMulter = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'static', 'avatars'),
        filename: function(request, file, callback) {
            const hash = crypto.randomBytes(10).toString('hex');
            const dt = new Date();
            const date = `${dt.getFullYear()}${dt.getMonth()}${dt.getDate()}`;
            const time = `${dt.getHours()}${dt.getMinutes()}${dt.getSeconds()}${dt.getMilliseconds()}`;
            const timestamp = `${date}${time}`;
            const ext = file.originalname.split('.').pop();
            callback(null, `${hash}_${timestamp}.${ext}`);
        },
    }),
    limits: {
        files: 1,
        fileSize: 1024 * 1024 // 1mb?
    },
    fileFilter: function(request: Request<any, any, RequestBody>, file, callback) {
        const isAccepted = [
            'image/png',
            'image/jpg',
            'image/jpeg'
        ].find(accept => accept == file.mimetype);
        if (!isAccepted) {
            return callback(new Error('Tipo de imagem não suportado.'));
        }
        if (file.size > 1024 * 1024) {
            return callback(new Error('O arquivo deve ter, no máximo 1mb'));
        }
        if (request.body.email) {
            const userRepo = getRepository(User);
            userRepo.findOne({ where: { email: request.body.email } })
                .then((alreadyRegistered) => {
                    if (alreadyRegistered) {
                        return callback(new Error('Já existe um usuário com esse e-mail.'));
                    }
                    return callback(null, true);
                })
                .catch((err) => {
                    return callback(new Error('Não foi possível acessar o banco de dados.'));
                });
        } else {
            return callback(null, true);
        }
    },
});

export default function UserUpdateAvatarUpload(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const upload = UserUpdateAvatarUploadMulter.single('avatar');
    return upload(request, response, (err: any) => {
        if (err && err.message) {
            return response.status(httpStatusCode.HTTP_400_BAD_REQUEST).json({
                errorCodes: outputErrors.errorCodes.AVATAR_UPLOAD_ERROR,
                error: String(err.message),
            });
        } else if (err) {
            return next(err);
        }
        return next();
    });
}
