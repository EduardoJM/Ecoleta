import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

export function retrieveUFs(callback : (error: string | null, result?: string[]) => void) {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
        if (response.status !== 200) {
            callback('Não foi possível carregar os dados do IBGE');
        } else {
            const ufInitials = response.data.map((uf) => uf.sigla);
            callback(null, ufInitials);
        }
    });
}

export function retrieveCities(uf: string, callback : (error: string | null, result?: string[]) => void) {
    if (uf === '0') {
        return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then((response) => {
        if (response.status !== 200) {
            callback('Não foi possível carregar os dados do IBGE');
        } else {
            const citiesData = response.data.map((city) => city.nome);
            callback(null, citiesData);
        }
    });
}
