import React, { useState, useEffect } from 'react';

import api from '../../services/api';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface ItemSelectorProps {
    selectedItems: number[];
    setSelectedItems: (selectedItems: number[]) => void;
    handleError?: (message: string) => void;
}

const ItemSelector: React.FC<ItemSelectorProps> = ({
    selectedItems,
    setSelectedItems,
    handleError,
}) => {
    const [items, setItems] = useState<Item[]>([]);
    
    useEffect(() => {
        api.get('items').then((response) => {
            if (response.status !== 200) {
                if (handleError) {
                    handleError('Não foi possível carregar os itens.');
                }
                return;
            }
            setItems(response.data);
        });
    }, [handleError]);

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
                        <img src={item.image_url} alt={item.title} />
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
        </fieldset>
    );
}

export default ItemSelector;