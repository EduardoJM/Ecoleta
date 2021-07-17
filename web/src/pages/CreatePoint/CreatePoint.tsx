import React, { useEffect, useState, ChangeEvent, FormEvent, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Store, actions } from '../../redux';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import ItemSelector from '../../components/ItemSelector';
import { Map, TileLayer, Marker } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { retrieveUFs, retrieveCities } from '../../services/ibge';

// TODO: remove this style and make it global
import '../styles/pages.css';

const CreatePoint: React.FC = () => {
    const { user } = useSelector((store: Store) => store.auth);
    const logged = useMemo(() => user !== null, [user]);
    const history = useHistory();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    });

    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [initialPosition, setInitialPosition] = useState<[number, number]>([-16.3390798, -48.9303596]);

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedFile, setSelectedFile] = useState<File>();

    useEffect(() => {
        if (!logged) {
            history.push("/login?next=/point/new");
        }
    }, [logged, history]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setInitialPosition([latitude, longitude]);
        });
    }, []);

    useEffect(() => {
        dispatch(actions.global.pushLoading());
        retrieveUFs((error, result) => {
            dispatch(actions.global.popLoading());
            if (error) {
                dispatch(actions.global.pushMessage(error));
            } else if (result) {
                setUfs(result);
            }
        });
    }, [dispatch]);

    useEffect(() => {
        if (selectedUf === '0') {
            return;
        }
        dispatch(actions.global.pushLoading());
        retrieveCities(selectedUf, (error, result) => {
            dispatch(actions.global.popLoading());
            if (error) {
                dispatch(actions.global.pushMessage(error));
            } else if (result) {
                setCities(result);
            }
        });
    }, [selectedUf, dispatch]);

    if (!logged) {
        return <></>;
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

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
    }

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleImageSelect(file: File) {
        if (file.size >= 1048576) {
            dispatch(actions.global.pushMessage('Tamanho do arquivo deve ser de, no máximo, 1 MB.'));
            return false;
        }
        setSelectedFile(file);
        return true;
    }

    return (
        <div className="page-content">
            <Header />

            <form className="styled" onSubmit={handleSubmit}>
                <h1>Cadastro do<br/> ponto de coleta</h1>

                <Dropzone onFileUploaded={handleImageSelect} />

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
                                placeholder="DDNNNNNNNNN"
                                onChange={handleInputChange}
                            />
                            <span className="info">O whatsapp deve conter apenas números, com 11 digitos (Os dois primeiros são o DDD e os outros 9 são o número).</span>
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

                <ItemSelector
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                />

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
};

export default CreatePoint;
