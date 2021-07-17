import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiX } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { actions, Store } from '../../redux';
import Header from '../../components/Header';

import '../styles/page-list-points.css';
import PointsList from '../../components/PointsList';

const UserPoints: React.FC = () => {
    const dispatch = useDispatch();
    
    const { points, pagesCount, page: currentPage } = useSelector((store: Store) => store.user);
    
    const [viewingMap, setViewingMap] = useState(-1);

    const { page: pageString } = useParams<{
        page?: string;
    }>();

    const page = useMemo(() => {
        if (!pageString) {
            return 1;
        }
        const num = parseInt(pageString, 10);
        if (Number.isNaN(num)) {
            return 1;
        }
        if (Number.isInteger(num)) {
            return num;
        }
        return 1;
    }, [pageString]);

    useEffect(() => {
        dispatch(actions.user.requestPoints(page));
    }, [page, dispatch]);

    return (
        <div className="page-list-points">
            <Header />

            <div className="content">
                <span>Mostrando seus pontos de coleta.</span>
            </div>

            <PointsList points={points} />

            {/*points.length === 0 ? (
                <div className="not-items-indicator">
                    <h2>Ops!</h2>
                    <span>Ainda não tempos pontos de coleta cadastrados nessa cidade!</span>
                </div>
            ) : (
                <div className="items">
                    {points.map((point, index) => (
                        <React.Fragment key={point.id}>
                            <div className="item">
                                <img alt="title" src={point.image} />
                                <h2>{point.name}</h2>
                                <h3>{point.items.map((item) => item.title).join(', ')}</h3>
                                <p>{point.city}, {point.uf} (<span onClick={() => setViewingMap(index)} className="fake-link">Ver no Mapa</span>)</p>
                                <div className="contact">
                                    <a href={`mailto:${point.email}`} className="button">
                                        <FiMail /> E-mail
                                    </a>
                                    <a href={`https://wa.me/55${point.whatsapp}`} className="button">
                                        <FaWhatsapp /> Whatsapp
                                    </a>
                                </div>
                            </div>
                            {index === viewingMap && (
                                <div className="item-map">
                                    <div className="close-map">
                                        <span onClick={() => setViewingMap(-1)}>
                                            Fechar Mapa
                                            <FiX />
                                        </span>
                                    </div>
                                    <Map
                                        center={[point.latitude, point.longitude]}
                                        zoom={15}
                                    >
                                        <TileLayer
                                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[point.latitude, point.longitude]}>
                                            <Popup>{point.name}</Popup>
                                            <Tooltip>{point.name}</Tooltip>
                                        </Marker>
                                    </Map>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )*/}

            {currentPage !== pagesCount && (
                <span>TODO: Escrever Paginação Aqui</span>
            )}
        </div>
    );
};

export default UserPoints;
