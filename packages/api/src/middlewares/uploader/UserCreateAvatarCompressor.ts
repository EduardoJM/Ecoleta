import { Request, Response, NextFunction } from 'express';
import path from 'path';
import compressImage from '../../utils/image';
import { httpStatusCode, outputErrors } from '../../constants';

export default function UserCreateAvatarCompressor(request: Request, response: Response, next: NextFunction) {
    if (!request.file) {
        return next();
    } else {
        compressImage(request.file, 400).then((newPath) => {
            request.file.path = newPath;
            request.body.avatar = path.basename(newPath);
            return next();
        }).catch((err) => {
            return response
                .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                .json({
                    error: outputErrors.errorCodes.AVATAR_COMPRESS_ERROR,
                    message: String(err)
                });
        });
    }
}
