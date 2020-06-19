import { celebrate, Joi } from 'celebrate';

const validation = celebrate({
    body: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required(),
        whatsapp: Joi.string().required().length(11),
        latitude: Joi.number().required(),
        longitude: Joi.number().required(),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
        items: Joi.string().required(),
    }),
}, {
    abortEarly: false,
});

/*
Observation 1: The phone number is parsed as string here
and has an length of 11 because is in the format:
xxnnnnnaaaa:
xx -> DDD (2 digits in brazilian numbers)
nnnnn -> five first numbers (original 4 numbers and the added 9)
aaaa -> last four numbers
 */
/*
Observation 2: The UF has changed from max(2) to length(2)
because all of UF in Brazil has two letters.
*/

export default validation;
