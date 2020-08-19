import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

import { getUfs, getCities } from '../../services/ibge';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';

import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import ItemSelector from '../../components/ItemSelector';
import Modal, { useModal } from '../../components/Modal';

import './styles.css';

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

interface ErrorData {
    error: boolean;
    message: string;
}

const PointDashboard = () => {
    const { signed, point, items:initialItems, signOut } = useAuth();
    const [ initialData, setInitialData ] = useState<EditPointFormData>({} as EditPointFormData);
    const [ initialItemsCheck, setInitialItemsCheck ] = useState<number[]>([]);
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
    const [ selectedItems, setSelectedItems ] = useState<number[]>([]);
    const [ loading, setLoading ] = useState(true);
    const [ initialPosition, setInitialPosition ] = useState<[number, number]>([0, 0]);
    const [ ufs, setUfs ] = useState<string[]>([]);
    const [ cities, setCities ] = useState<string[]>([]);
    const [ errorData, setErrorData ] = useState<ErrorData>({
        error: false,
        message: '',
    });
    const [fileError, setFileError] = useState('');
    const completeModal = useModal(false);
    const [ selectedFile, setSelectedFile ] = useState<File>();
    
    useEffect(() => {
        getUfs((result) => {
            if (result.error) {
                setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os dados do IBGE',
                });
                return;
            }
            setUfs(result.ufs);
        });
    }, []);

    useEffect(() => {
        getCities(formData.uf, (result) => {
            if (result.error) {
                setErrorData({
                    error: true,
                    message: 'Não foi possível carregar os dados do IBGE',
                });
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
            setInitialData(pointData);
            setLoading(false);
            setInitialPosition([pointData.latitude, pointData.longitude]);
        }
    }, [point]);

    useEffect(() => {
        const array = initialItems.map(item => (item as InitialItem).id);
        setSelectedItems(array);
        setInitialItemsCheck(array);
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
        
        const {
            name,
            email,
            whatsapp,
            password,
            uf,
            city,
            latitude,
            longitude,
        } = formData;
        const items = selectedItems;

        const data = new FormData();
        data.append('originalemail', initialData.email);
        if (name !== initialData.name) {
            data.append('name', name);
        }
        if (email !== initialData.email) {
            data.append('email', email);
        }
        if (password && password !== '') {
            data.append('password', password);
        }
        if (whatsapp !== initialData.whatsapp) {
            data.append('whatsapp', whatsapp);
        }
        if (uf !== initialData.uf) {
            data.append('uf', uf);
        }
        if (city !== initialData.city) {
            data.append('city', city);
        }
        if (latitude !== initialData.latitude) {
            data.append('latitude', String(latitude));
        }
        if (longitude !== initialData.longitude) {
            data.append('longitude', String(longitude));
        }
        const filter1 = items.filter((id) => !initialItemsCheck.includes(id));
        const filter2 = initialItemsCheck.filter((id) => !items.includes(id));
        if (filter1.length > 0 || filter2.length > 0) {
            data.append('items', items.join(','));
        }
        // if image is set, add this to data
        if (selectedFile) {
            data.append('image', selectedFile);
        }
        const response = await api.post('points/update', data);
        if (response.status !== 200) {
            setErrorData({
                error: true,
                message: 'Erro ao cadastrar o ponto de coleta.',
            });
            return;
        }
        // update the local storage and edit dashboard initial items
        localStorage.setItem('@EcoletaAuth:point', JSON.stringify(response.data.point));
        localStorage.setItem('@EcoletaAuth:items', JSON.stringify(response.data.items));
        setInitialData(response.data.point);
        const array = (response.data.items as object[]).map(item => (item as InitialItem).id);
        setInitialItemsCheck(array);
        completeModal.open();
    }

    if (loading) {
        return <div />;
    }

    return (
        <div id="page-dashboard">
            <Header>
                <div className="header-exit">
                    <h2>Dashboard</h2>
                    <span onClick={handleSignOut}>Sair</span>
                </div>
            </Header>

            <form className="styled" onSubmit={handleSubmit}>
                <h1>Atualizar <br/>Ponto de coleta</h1>

                <Dropzone onFileUploaded={handleImageSelect} />
                {fileError && (
                    <p>{fileError}</p>
                )}
                <span className="info">Caso não queira alterar a imagem, basta não adicionar imagem nesse campo.</span>

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

                <ItemSelector
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />

                <button type="submit">
                    Atualizar ponto de coleta
                </button>
            </form>

            <Modal
                opened={errorData.error}
                handleClose={() => setErrorData({ error: false, message: '' })}
                hasCloseButton
            >
                <div className="icon-area red-icon">
                    <FiXCircle />
                </div>
                <div className="text-area">
                    <div>Erro no cadastro</div>
                    <div className="medium">{errorData.message}</div>
                    <div className="medium">Esse pode ser um erro com a sua internet. Caso persista, entre em contato pelo e-mail:</div>
                    <div className="small">eduardo_y05@outlook.com</div>
                </div>
            </Modal>

            <Modal
                opened={completeModal.modalOpen}
                handleClose={completeModal.close}
                hasCloseButton
            >
                <div className="icon-area green-icon">
                    <FiCheckCircle />
                </div>
                <div className="text-area">
                    <div>Cadastro Atualizado!</div>
                </div>
            </Modal>
        </div>
    );
};

export default PointDashboard;
