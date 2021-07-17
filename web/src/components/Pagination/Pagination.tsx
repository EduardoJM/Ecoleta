import React, { useMemo } from 'react';
import { PaginationContainer, PaginationItem } from './styles';

interface PaginationProps {
    from: number;
    current: number;
    to: number;
    linkPrefix: string;
}

interface Item {
    page: number;
    active: boolean;
    link: string;
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { from, current, to, linkPrefix } = props;
    const pages = useMemo(() => {
        const items: Item[] = [];
        for (let i = from; i <= to; i += 1) {
            items.push({
                page: i,
                active: i === current,
                link: `${linkPrefix}${i}`,
            });
        }
        return items;
    }, [from, current, to, linkPrefix]);

    function handleItemClick() {
        window.scrollTo(0, 0);
    }

    return (
        <PaginationContainer>
            {pages.map((item) => (
                <PaginationItem
                    key={item.page}
                    to={item.link}
                    className={item.active ? 'active' : ''}
                    onClick={handleItemClick}
                >
                    {item.page}
                </PaginationItem>
            ))}
        </PaginationContainer>
    );
};

export default Pagination;
