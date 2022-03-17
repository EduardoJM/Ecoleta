import { celebrate, Joi } from 'celebrate';

const AuthDataValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
    }),
}, {
    abortEarly: false,
});

export default AuthDataValidation;
