import 'reflect-metadata';
import { getRepository } from 'typeorm';

import createConnection from './connection';
import { Item } from './entities';

createConnection().then(async (connection) => {
    console.log('CONNECTED');
    if (!connection) {
        return;
    }

    function make(title: string, image: string) : Item {
        console.log(`CREATING: ${title}`);
        const item = new Item();
        item.image = image;
        item.title = title;
        return item;
    }

    console.log('BEGIN CREATION');
    const items : Item[]  = [
        make('Lâmpadas', 'lampadas.svg'),
        make('Pilhas e Baterias', 'baterias.svg'),
        make('Papéis e Papelão', 'papeis-papelao.svg'),
        make('Resíduos Eletrônicos', 'eletronicos.svg'),
        make('Resíduos Orgânicos', 'organicos.svg'),
        make('Óleos de Cozinha', 'oleo.svg'),
    ];
    console.log('END CREATION');
    console.log('GET REPOSITORY');
    const repo = getRepository(Item);
    console.log('SAVING');
    await repo.save(items);
    console.log('END SAVING');
    
    await connection.close();
});
