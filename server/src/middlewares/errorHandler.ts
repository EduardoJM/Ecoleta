import { Request, Response, NextFunction } from 'express';

interface ErrorInterface {
    name: string;
    code?: string;
    message: string;
}

function errorHandler (
    error: ErrorInterface,
    request: Request,
    response: Response,
    next: NextFunction
) {
    return response.status(500)
        .json({
            error: true,
            information: {
                in: 'file_upload',
                code: error.code,
                message: error.message,
            },
        });
}

export default errorHandler;
