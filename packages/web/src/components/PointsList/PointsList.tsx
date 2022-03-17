import React, { useState } from 'react';
import { Map, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Point } from '../../types';
import PointItem from './Point';
import { PointsNotFound, PointsGrid, PreviewMapContainer } from './styles';
import Modal from '../Modal';

interface PointsListProps {
    points: Point[];
    variant?: 'any' | 'owner';
}

const PointsList: React.FC<PointsListProps> = (props) => {
    const { points, variant = 'any' } = props;

    const [viewingOnMap, setViewingOnMap] = useState<Point | null>(null);

    function handleViewMap(point: Point) {
        setViewingOnMap(point);
    }

    function handleCloseModal() {
        setViewingOnMap(null);
    }

    if (points.length === 0) {
        return (
            <PointsNotFound>
                <h2>Ops!</h2>
                <span>Não temos pontos cadastrados nessa página!</span>
            </PointsNotFound>
        )
    }

    return (
        <>
            <PointsGrid>
                {points.map((point) => (
                    <PointItem
                        key={point.id}
                        point={point}
                        onViewMap={handleViewMap}
                        variant={variant}
                    />
                ))}
            </PointsGrid>
            <Modal
                opened={viewingOnMap !== null}
                handleClose={handleCloseModal}
                hasCloseButton={true}
            >
                {viewingOnMap && (
                    <PreviewMapContainer>
                        <Map
                            center={[viewingOnMap.latitude, viewingOnMap.longitude]}
                            zoom={15}
                        >
                            <TileLayer
                                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[viewingOnMap.latitude, viewingOnMap.longitude]}>
                                <Popup>{viewingOnMap.name}</Popup>
                                <Tooltip>{viewingOnMap.name}</Tooltip>
                            </Marker>
                        </Map>
                    </PreviewMapContainer>
                )}
            </Modal>
        </>
    );
};

export default PointsList;
