export const errorCodes = {
    EMAIL_ALREADY_REGISTERED: 'EMAIL_ALREADY_REGISTERED',
    EMAIL_REQUIRED: 'EMAIL_REQUIRED',
    UNKNOWN_SAVE_ERROR: 'UNKNOWN_SAVE_ERROR',
    AVATAR_UPLOAD_ERROR: 'AVATAR_UPLOAD_ERROR',
    AVATAR_COMPRESS_ERROR: 'AVATAR_COMPRESS_ERROR'
};

export const errorMessages = {
    EMAIL_ALREADY_REGISTERED: 'O e-mail já está cadastrado',
    EMAIL_REQUIRED: 'O e-mail é necessário',
    UNKNOWN_SAVE_ERROR: 'Não foi possível salvar',
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
};
