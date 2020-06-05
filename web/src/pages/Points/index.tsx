import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi'

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
            console.log(response.data);
            setPoints(response.data);
            setIsLoading(false);
        });
    }, [uf, city]);

    // TODO: create the show in the map screen

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
                            {points.map((point) => (
                                <div className="item" key={point.point.id}>
                                    <img alt="title" src={point.point.image_url} />
                                    <h2>{point.point.name}</h2>
                                    <h3>{point.items.map((item) => item.title).join(', ')}</h3>
                                    <p>{point.point.city}, {point.point.uf} (<span className="fake-link">Ver no Mapa</span>)</p>
                                    <div className="contact">
                                        <a href={`mailto:${point.point.email}`} className="button">
                                            <FiMail /> E-mail
                                        </a>
                                        <a href={`https://wa.me/${point.point.whatsapp}`} className="button">
                                            <FaWhatsapp /> Whatsapp
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
   )
};

export default Points;
