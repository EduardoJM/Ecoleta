import { Request, Response, NextFunction } from 'express';
import path from 'path';
import compressImage from '../../utils/image';
import { httpStatusCode, outputErrors } from '../../constants';

export default function PointCreateImageCompressor(request: Request, response: Response, next: NextFunction) {
    if (!request.file) {
        return next();
    } else {
        compressImage(request.file, 800).then((newPath) => {
            request.file.path = newPath;
            request.body.image = path.basename(newPath);
            return next();
        }).catch((err) => {
            return response
                .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                .json({
                    error: outputErrors.errorCodes.IMAGE_COMPRESSOR_ERROR,
                    message: String(err)
                });
        });
    }
}
