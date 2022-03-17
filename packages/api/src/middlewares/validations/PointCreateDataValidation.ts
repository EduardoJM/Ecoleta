import { celebrate, Joi } from 'celebrate';

const PointCreateDataValidation = celebrate({
    body: Joi.object().keys({
        image: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().length(11).regex(/\d{11}/i).required(),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required(),
        items: Joi.string().regex(/(\d+( *, *)*)*/i).required(),
    }),
}, {
    abortEarly: false,
});

export default PointCreateDataValidation;
