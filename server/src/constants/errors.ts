export const errorCodes = {
    EMAIL_ALREADY_REGISTERED: 'EMAIL_ALREADY_REGISTERED',
    EMAIL_REQUIRED: 'EMAIL_REQUIRED',
    UNKNOWN_SAVE_ERROR: 'UNKNOWN_SAVE_ERROR',
    AVATAR_UPLOAD_ERROR: 'AVATAR_UPLOAD_ERROR',
    AVATAR_COMPRESS_ERROR: 'AVATAR_COMPRESS_ERROR',
    EMAIL_NOT_REGISTERED: 'EMAIL_NOT_REGISTERED',
    WRONG_PASSWORD: 'WRONG_PASSWORD',
    AUTH_INVALID_TOKEN: 'AUTH_INVALID_TOKEN',
    AUTH_EXPIRED_TOKEN: 'AUTH_EXPIRED_TOKEN',
    AUTH_NO_TOKEN: 'AUTH_NO_TOKEN',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    IMAGE_UPLOAD_ERROR: 'IMAGE_UPLOAD_ERROR',
    IMAGE_COMPRESSOR_ERROR: 'IMAGE_COMPRESSOR_ERROR',
    PAGE_NOT_FOUND: 'PAGE_NOT_FOUND',
    POINT_NOT_FOUND: 'POINT_NOT_FOUND',
};

export const errorMessages = {
    EMAIL_ALREADY_REGISTERED: 'O e-mail já está cadastrado',
    EMAIL_REQUIRED: 'O e-mail é necessário',
    UNKNOWN_SAVE_ERROR: 'Não foi possível salvar',
    EMAIL_NOT_REGISTERED: 'E-mail ou senha incorretos',
    WRONG_PASSWORD: 'E-mail ou senha incorretos',
    AUTH_INVALID_TOKEN: 'Token de autenticação inválido',
    AUTH_EXPIRED_TOKEN: 'Token de autenticação expirado',
    AUTH_NO_TOKEN: 'Token de autenticação não enviado',
    USER_NOT_FOUND: 'Usuário não encontrado',
    PAGE_NOT_FOUND: 'Página não encontrada',
    POINT_NOT_FOUND: 'Ponto não encontrado',
};

export const responses = {
    EMAIL_ALREADY_REGISTERED: {
        errorCode: errorCodes.EMAIL_ALREADY_REGISTERED,
        error: errorMessages.EMAIL_ALREADY_REGISTERED,
    },
    UNKNOWN_SAVE_ERROR: {
        errorCodes: errorCodes.UNKNOWN_SAVE_ERROR,
        error: errorMessages.UNKNOWN_SAVE_ERROR,
    },
    EMAIL_REQUIRED: {
        errorCodes: errorCodes.EMAIL_REQUIRED,
        error: errorMessages.EMAIL_REQUIRED,
    },
    EMAIL_NOT_REGISTERED: {
        errorCodes: errorCodes.EMAIL_NOT_REGISTERED,
        error: errorMessages.EMAIL_NOT_REGISTERED,
    },
    WRONG_PASSWORD: {
        errorCodes: errorCodes.WRONG_PASSWORD,
        error: errorMessages.WRONG_PASSWORD,
    },
    AUTH_INVALID_TOKEN: {
        errorCodes: errorCodes.AUTH_INVALID_TOKEN,
        error: errorMessages.AUTH_INVALID_TOKEN,
    },
    AUTH_EXPIRED_TOKEN: {
        errorCodes: errorCodes.AUTH_EXPIRED_TOKEN,
        error: errorMessages.AUTH_EXPIRED_TOKEN,
    },
    AUTH_NO_TOKEN: {
        errorCodes: errorCodes.AUTH_NO_TOKEN,
        error: errorMessages.AUTH_NO_TOKEN,
    },
    USER_NOT_FOUND: {
        errorCodes: errorCodes.USER_NOT_FOUND,
        error: errorMessages.USER_NOT_FOUND,
    },
    PAGE_NOT_FOUND: {
        errorCodes: errorCodes.PAGE_NOT_FOUND,
        error: errorMessages.PAGE_NOT_FOUND,
    },
    POINT_NOT_FOUND: {
        errorCodes: errorCodes.POINT_NOT_FOUND,
        error: errorMessages.POINT_NOT_FOUND,
    },
};
