import React from 'react';
import { Point } from '../../types';
import PointItem from './Point';
import { PointsNotFound, PointsGrid } from './styles';

interface PointsListProps {
    points: Point[];
}

const PointsList: React.FC<PointsListProps> = (props) => {
    const { points } = props;

    function handleViewMap(point: Point) {

    }

    if (points.length === 0) {
        return (
            <PointsNotFound>
                <h2>Ops!</h2>
                <span>Ainda não tempos pontos de coleta cadastrados nessa cidade!</span>
            </PointsNotFound>
        )
    }

    return (
        <PointsGrid>
            {points.map((point) => (
                <PointItem key={point.id} point={point} onViewMap={handleViewMap} />
            ))}
        </PointsGrid>
    );
};

export default PointsList;
