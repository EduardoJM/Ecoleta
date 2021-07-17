// import packages
import React, { useState, useEffect, ChangeEvent } from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
// import local components/hooks
import Modal, { useModal } from '../../components/Modal';
// import services
//import { getUfs, getCities } from '../../services/ibge';
// import assets
import logo from '../../assets/logo.svg';
import './styles.css';

const Home = () => {
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const cityModal = useModal();

    const history = useHistory();

    useEffect(() => {
        /*getUfs((result) => {
            if (result.error) {
                return;
            }
            setUfs(result.ufs);
        });*/
    }, []);

    useEffect(() => {
        /*if (selectedUf === '0') {
            return;
        }
        getCities(selectedUf, (result) => {
            if (result.error) {
                return;
            }
            setCities(result.cities);
        });*/
    }, [selectedUf]);

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    function handleNavigateToPoints() {
        history.push(`/points/${selectedUf}/${selectedCity}`);
    }

    function handleLogin() {
        history.push('/signin');
    }

    return (
        <>
            <div id="page-home">
                <div className="content">
                    <header>
                        <img src={logo} alt="Ecoleta" />
                    </header>

                    <main>
                        <h1>Seu marketplace de coleta de resíduos.</h1>
                        <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>

                        <Link className="button" to="/point/new">
                            <span>
                                <FiLogIn />
                            </span>
                            <strong>Cadastre um ponto de coleta</strong>
                        </Link>

                        <p>Ou <span className="fake-link" onClick={cityModal.open}>encontre um ponto próximo de você</span>. Você pode, também, <span className="fake-link" onClick={handleLogin}>entrar para alterar seus dados</span>.</p>
                    </main>
                </div>
            </div>

            <Modal
                opened={cityModal.modalOpen}
                handleClose={cityModal.close}
                hasCloseButton
            >
                <div className="text-area">
                    <div>Pontos de coleta</div>
                </div>
                <div className="overlay-form">
                    <div className="field">
                        <select
                            value={selectedUf}
                            onChange={handleSelectUf}
                            name="uf"
                            id="uf"
                        >
                            <option value="0">Selecione o estado</option>
                            {ufs.map(uf => (
                                <option key={uf} value={uf}>{uf}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <select
                            value={selectedCity}
                            onChange={handleSelectCity}
                            name="city"
                            id="city"
                        >
                            <option value="0">Selecione a cidade</option>
                            {cities.map(city => (
                                <option key={city} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>

                    <div className="field">
                        <span className="button" onClick={handleNavigateToPoints}>
                            <strong>Buscar</strong>
                        </span>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default Home;