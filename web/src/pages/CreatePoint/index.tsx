import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { FiCheckCircle, FiX, FiXCircle } from 'react-icons/fi';
import { Map, TileLayer, Marker } from 'react-leaflet';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

import validateCreatePointData from './validation';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';

import api from '../../services/api';

import './styles.css';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

interface ErrorData {
    error: string | boolean;
    message: string;
}

const CreatePoint = () => {
    const [errorData, setErrorData] = useState<ErrorData>({
        error: false,
        message: '',
    });
    const [fileError, setFileError] = useState('');
    const [hasCompleted, setHasCompleted] = useState(false);

    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const history = useHistory();

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);
    
    useEffect(() => {
        api.get('items').then((response) => {
            if (response.status !== 200) {
                setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os itens.',
                });
                return;
            }
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then((response) => {
            if (response.status !== 200) {
                setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os dados do IBGE',
                });
                return;
            }
            const ufInitials = response.data.map((uf) => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then((response) => {
            if (response.status !== 200) {
                setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os dados do IBGE',
                });
                return;
            }
            const citiesData = response.data.map((city) => city.nome);
            setCities(citiesData);
        });
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ]);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.includes(id);
        if (alreadySelected) {
            const filteredItems = selectedItems.filter((item) => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    function handleImageSelect(file: File) {
        if (file.size >= 1048576) {
            setFileError("Tamanho do arquivo deve ser no máximo de 1mb");
            return false;
        }
        setSelectedFile(file);
        setFileError('');
        return true;
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const { name, email, whatsapp } = formData;
        const uf = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;
        
        if (!selectedFile) {
            setErrorData({
                error: true,
                message: 'Você precisa enviar uma imagem do seu ponto de coleta.',
            });
            return;
        }
        const validationResult = await validateCreatePointData({
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items,
        });
        
        if (!validationResult) {
            setErrorData({
                error: true,
                message: 'Há uma inconsistência com os seus dados.'
            });
            return;
        }

        const data = new FormData();
        data.append('name', name);
        data.append('email', email);
        data.append('whatsapp', whatsapp);
        data.append('uf', uf);
        data.append('city', city);
        data.append('latitude', String(latitude));
        data.append('longitude', String(longitude));
        data.append('items', items.join(','));
        data.append('image', selectedFile);

        const response = await api.post('points', data);
        if (response.status !== 200) {
            setErrorData({
                error: true,
                message: 'Erro ao cadastrar o ponto de coleta.',
            });
            return;
        }
        setHasCompleted(true);
        setTimeout(() => {
            history.push('/');
        }, 3000);
    }

    return (
        <div id="page-create-point">
            <Header />

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do<br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={handleImageSelect} />
                {fileError && (
                    <p>{fileError}</p>
                )}
                
                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map
                        center={initialPosition}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf"
                                id="uf"
                                value={selectedUf}
                                onChange={handleSelectUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select
                                name="city"
                                id="city"
                                value={selectedCity}
                                onChange={handleSelectCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map((item) => (
                            <li
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                            >
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>

            {errorData.error && (
                <div className="overlay">
                    <div
                        className="close-button"
                        onClick={() => setErrorData({ error: false, message: '' })}
                    >
                        <FiX />
                    </div>
                    <div className="icon-area red-icon">
                        <FiXCircle />
                    </div>
                    <div className="text-area">
                        <div>Erro no cadastro</div>
                        <div className="medium">{errorData.message}</div>
                        <div className="medium">Esse pode ser um erro com a sua internet. Caso persista, entre em contato pelo e-mail:</div>
                        <div className="small">eduardo_y05@outlook.com</div>
                    </div>
                </div>
            )}

            {hasCompleted && (
                <div className="overlay">
                    <div className={`icon-area green-icon`}>
                        <FiCheckCircle />
                    </div>
                    <div className="text-area">
                        <div>Cadastro Concluído!</div>
                    </div>
                </div>
            )}
        </div>
    )
};

export default CreatePoint;
