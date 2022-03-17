import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { actions, Store } from '../../redux';

import './styles.css';

interface ItemSelectorProps {
    selectedItems: number[];
    setSelectedItems: (selectedItems: number[]) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
    selectedItems,
    setSelectedItems,
}) => {
    const items = useSelector((store: Store) => store.items);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(actions.items.requestItems());
    }, [dispatch]);

    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.includes(id);
        if (alreadySelected) {
            const filteredItems = selectedItems.filter((item) => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id])
        }
    }

    return (
        <fieldset>
            <legend>
                <h2>Ítens de coleta</h2>
                <span>Selecione um ou mais ítens abaixo</span>
            </legend>

            <ul className="items-grid">
                {items.map((item) => (
                    <li
                        className={selectedItems.includes(item.id) ? 'selected' : ''}
                        key={item.id}
                        onClick={() => handleSelectItem(item.id)}
                    >
                        <img src={item.image} alt={item.title} />
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}

export default ItemSelector;
