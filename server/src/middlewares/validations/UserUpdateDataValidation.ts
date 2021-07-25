import { celebrate, Joi } from 'celebrate';

const UserUpdateDataValidation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().optional(),
        email: Joi.string().email().optional,
        password: Joi.string().optional(),
        avatar: Joi.string().optional(),
    }),
}, {
    abortEarly: false,
});

export default UserUpdateDataValidation;
