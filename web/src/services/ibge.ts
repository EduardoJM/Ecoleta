import axios from 'axios';

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

export interface UFResult{
    error?: boolean;
    errorMessage?: string;
    ufs: string[];
}

export interface CityResult{
    error: boolean;
    errorMessage?: string;
    cities: string[];
}

export function getUfs(callback : (result: UFResult) => void) {
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
        if (response.status !== 200) {
            callback({
                error: true,
                errorMessage: 'Não foi possível carregar os dados do IBGE',
                ufs: [],
            });
        } else {
            const ufInitials = response.data.map((uf) => uf.sigla);
            callback({
                error: false,
                ufs: ufInitials,
            });
        }
    });
}

export function getCities(uf: string, callback : (result: CityResult) => void) {
    if (uf === '0') {
        return;
    }
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`).then((response) => {
        if (response.status !== 200) {
            callback({
                error: true,
                errorMessage: 'Não foi possível carregar os dados do IBGE',
                cities: [],
            });
        } else {
            const citiesData = response.data.map((city) => city.nome);
            callback({
                error: false,
                cities: citiesData,
            });
        }
    });
}