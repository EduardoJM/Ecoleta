import { celebrate, Joi } from 'celebrate';

const UserCreateDataValidation = celebrate({
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        avatar: Joi.string().required(),
    }),
}, {
    abortEarly: false,
});

export default UserCreateDataValidation;
