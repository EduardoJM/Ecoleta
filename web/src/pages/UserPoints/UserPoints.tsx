import React, { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Store } from '../../redux';
import Header from '../../components/Header';
import PointsList from '../../components/PointsList';
import Pagination from '../../components/Pagination';

import '../styles/page-list-points.css';

const UserPoints: React.FC = () => {
    const dispatch = useDispatch();
    const { points, pagesCount, page: currentPage } = useSelector((store: Store) => store.user);
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

            {pagesCount > 1 && (
                <Pagination
                    from={1}
                    to={pagesCount}
                    current={currentPage}
                    linkPrefix="/user/points/"
                />
            )}
        </div>
    );
};

export default UserPoints;
