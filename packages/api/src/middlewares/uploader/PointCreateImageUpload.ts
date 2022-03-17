import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import { getRepository } from 'typeorm';
import { Point } from '../../entities';
import { httpStatusCode, outputErrors } from '../../constants';

interface RequestBody {
    email?: string;
    whatsapp?: string;
}

const PointCreateImageUploadMulter = multer({
    storage: multer.diskStorage({
        destination: path.resolve(__dirname, '..', '..', '..', 'static', 'points'),
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
        if (!request.body.email) {
            return callback(new Error('Email é necessário para criar novo ponto de coleta.'));
        }
        if (!request.body.whatsapp) {
            return callback(new Error('Whatsapp é necessário para criar novo ponto de coleta.'));
        }
        const pointRepo = getRepository(Point);
        pointRepo
            .findOne({
                where: [
                    { email: request.body.email },
                    { whatsapp: request.body.whatsapp }
                ]
            })
            .then((alreadyRegistered) => {
                if (alreadyRegistered) {
                    return callback(new Error('Já existe um ponto de coleta com o mesmo e-mail ou whatsapp.'));
                }
                return callback(null, true);
            })
            .catch((err) => {
                return callback(new Error('Não foi possível acessar o banco de dados.'));
            });
    },
});

export default function PointCreateImageUpload(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const upload = PointCreateImageUploadMulter.single('image');
    return upload(request, response, (err: any) => {
        if (err && err.message) {
            return response.status(httpStatusCode.HTTP_400_BAD_REQUEST).json({
                errorCodes: outputErrors.errorCodes.IMAGE_UPLOAD_ERROR,
                error: String(err.message),
            });
        } else if (err) {
            return next(err);
        }
        return next();
    });
}
