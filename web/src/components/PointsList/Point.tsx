import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMail } from 'react-icons/fi';
import { Point as PointType } from '../../types';
import { PointItem } from './styles';

interface PointProps {
    point: PointType;
    onViewMap: (point: PointType) => void;
}

const Point: React.FC<PointProps> = (props) => {
    const { point, onViewMap } = props;

    return (
        <PointItem>
            <img alt="title" src={point.image} />
            <h2>{point.name}</h2>
            <h3>{point.items.map((item) => item.title).join(', ')}</h3>
            <p>{point.city}, {point.uf} (<span onClick={() => onViewMap(point)} className="fake-link">Ver no Mapa</span>)</p>
            <div className="contact">
                <a href={`mailto:${point.email}`} className="button">
                    <FiMail /> E-mail
                </a>
                <a href={`https://wa.me/55${point.whatsapp}`} className="button">
                    <FaWhatsapp /> Whatsapp
                </a>
            </div>
        </PointItem>
    )
};

export default Point;
