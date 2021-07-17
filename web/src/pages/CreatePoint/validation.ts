import * as yup from 'yup';

export const CreatePointDataSchema = yup.object().shape({
    name: yup
        .string()
        .required('Você precisa inserir o nome do seu ponto de coleta.'),
    email: yup
        .string()
        .required('Você precisa inserir um e-mail do seu ponto de coleta.')
        .email('Você precisa inserir um e-mail válido do seu ponto de coleta.'),
    whatsapp: yup
        .string()
        .required('Você precisa inserir o WhatsApp do seu ponto de coleta.')
        .length(11, 'O WhatsApp do seu ponto de coleta precisa ter 11 digitos (DDD + 9 digitos do número).')
        .matches(/\d{11}/, 'O WhatsApp do seu ponto de coleta precisa ter 11 digitos (DDD + 9 digitos do número).'),
    latitude: yup
        .number()
        .required('Você precisa selecionar o local do seu ponto de coleta no mapa.'),
    longitude: yup
        .number()
        .required('Você precisa selecionar o local do seu ponto de coleta no mapa.'),
    city: yup
        .string()
        .required('Você precisa selecionar a cidade do seu ponto de coleta.'),
    uf: yup
        .string()
        .required('Você precisa selecionar o estado (UF) do seu ponto de coleta.')
        .length(2, 'Você precisa selecionar o estado (UF) do seu ponto de coleta.'),
    items: yup
        .array()
        .of(
            yup
            .number()
            .min(1, 'Apenas os itens com id entre 1 e 6 podem ser escolhidos.')
            .max(6, 'Apenas os itens com id entre 1 e 6 podem ser escolhidos.')
        ),
});
