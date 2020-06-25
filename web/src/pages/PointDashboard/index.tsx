import React, { useEffect, useState, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';

import { getUfs, getCities } from '../../services/ibge';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';

// TODO: check if is needed add some loading page

// TODO: create the "dashboard"

interface EditPointFormData {
    id: number;
    image: string;
    name: string;
    email: string;
    password: string;
    whatsapp: string;
    city: string;
    uf: string;
    latitude: number;
    longitude: number;
}

interface InitialItem {
    title: string;
    id: number;
}

interface Item {
    id: number;
    title: string;
    image_url: string;
}

const PointDashboard = () => {
    const { signed, point, items:initialItems, signOut } = useAuth();
    const [ formData, setFormData ] = useState<EditPointFormData>({
        id: -1,
        image: '',
        name: '',
        email: '',
        whatsapp: '',
        password: '',
        city: '',
        uf: '',
        latitude: 0,
        longitude: 0,
    });
    const [items, setItems] = useState<Item[]>([]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    
    useEffect(() => {
        getUfs((result) => {
            if (result.error) {
                console.log(result.errorMessage);
                return;
            }
            setUfs(result.ufs);
        })
    }, []);

    useEffect(() => {
        api.get('items').then((response) => {
            if (response.status !== 200) {
                /*setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os itens.',
                });*/
                console.log("ERRO!");
                return;
            }
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        getCities(formData.uf, (result) => {
            if (result.error) {
                console.log(result.errorMessage);
                return;
            }
            setCities(result.cities);
        });
    }, [formData.uf]);

    const history = useHistory();

    useEffect(() => {
        if (!signed) {
            history.push('/signin');
        }
    }, [signed, history]);

    useEffect(() => {
        if (point) {
            const pointData = point as EditPointFormData;
            setFormData(pointData);
            setLoading(false);
            setInitialPosition([pointData.latitude, pointData.longitude]);
        }
    }, [point]);

    useEffect(() => {
        setSelectedItems(initialItems.map(item => (item as InitialItem).id));
    }, [initialItems]);

    function handleSignOut() {
        signOut();
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setFormData({
            ...formData,
            latitude: event.latlng.lat,
            longitude: event.latlng.lng,
        });
    }

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setFormData({
            ...formData,
            uf 
        });
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setFormData({
            ...formData,
            city
        });
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

    if (loading) {
        return <h1>Loading...</h1>;
    }

    return (
        <div id="page-dashboard">
            <Header />

            <h2>Dashboard</h2>
            <button onClick={handleSignOut}>Sair</button>

            <form className="styled">
                <h1>Ponto de coleta</h1>

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
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                value={formData.whatsapp}
                                onChange={handleInputChange}
                            />
                            <span className="info">O whatsapp deve conter apenas números, com 11 digitos (Os dois primeiros são o DDD e os outros 9 são o número).</span>
                        </div>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            onChange={handleInputChange}
                        />
                        <span className="info">Caso não queira alterar a senha, não preencha esse campo.</span>
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
                        <Marker position={[formData.latitude, formData.longitude]} />
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="uf">Estado (UF)</label>
                            <select 
                                name="uf"
                                id="uf"
                                value={formData.uf}
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
                                value={formData.city}
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
                    Atualizar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default PointDashboard;
