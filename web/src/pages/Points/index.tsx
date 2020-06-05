import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail, FiX } from 'react-icons/fi'
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';

import api from '../../services/api';

import './styles.css';

import Header from '../../components/Header';

interface RouteParams{
    uf: string;
    city: string;
}

interface Point {
    point: {
        id: number;
        image: string;
        image_url: string;
        name: string;
        uf: string;
        city: string;
        email: string;
        whatsapp: string,
        latitude: number;
        longitude: number;
    };
    items: {
        title: string;
    }[];
};

const Points = () => {
    const { uf, city } = useParams<RouteParams>();
    const [points, setPoints] = useState<Point[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [viewingMap, setViewingMap] = useState(-1);

    useEffect(() => {
        api.get('points', {
            params: {
                city: city,
                uf: uf,
                ignoreItems: true,
                returnItems: true,
            },
        }).then(response => {
            if (response.status !== 200) {
                return;
            }
            setPoints(response.data);
            setIsLoading(false);
        });
    }, [uf, city]);

    return (
        <div id="page-points">
            <Header />
            <div className="content">
                <span>Mostrando pontos em <strong>{city}, {uf}</strong>.</span>
                <span><strong>{points.length} pontos</strong> encontrados.</span>
            </div>

            {isLoading ? (
                <div className="loading-indicator">
                    <span>Carregando...</span>
                </div>
            ) : (
                <>
                    {points.length === 0 ? (
                        <div className="not-items-indicator">
                            <h2>Ops!</h2>
                            <span>Ainda não tempos pontos de coleta cadastrados nessa cidade!</span>
                        </div>
                    ) : (
                        <div className="items">
                            {points.map((point, index) => (
                                <React.Fragment key={point.point.id}>
                                    <div className="item">
                                        <img alt="title" src={point.point.image_url} />
                                        <h2>{point.point.name}</h2>
                                        <h3>{point.items.map((item) => item.title).join(', ')}</h3>
                                        <p>{point.point.city}, {point.point.uf} (<span onClick={() => setViewingMap(index)} className="fake-link">Ver no Mapa</span>)</p>
                                        <div className="contact">
                                            <a href={`mailto:${point.point.email}`} className="button">
                                                <FiMail /> E-mail
                                            </a>
                                            <a href={`https://wa.me/55${point.point.whatsapp}`} className="button">
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
                                                center={[point.point.latitude, point.point.longitude]}
                                                zoom={15}
                                            >
                                                <TileLayer
                                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                />
                                                <Marker position={[point.point.latitude, point.point.longitude]}>
                                                    <Popup>{point.point.name}</Popup>
                                                    <Tooltip>{point.point.name}</Tooltip>
                                                </Marker>
                                            </Map>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
   )
};

export default Points;
