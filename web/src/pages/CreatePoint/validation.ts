import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email(),
    password: yup.string().required(),
    whatsapp: yup.string().required().length(11).matches(/^[0-9]+$/, 'apenas digitos'),
    latitude: yup.number().required(),
    longitude: yup.number().required(),
    city: yup.string().required(),
    uf: yup.string().required().length(2),
    items: yup.array().of(yup.number().min(1).max(6)),
});

export default async function validateCreatePointData(pointData: object) {
    return await schema.isValid(pointData);
};
