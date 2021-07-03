import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../entities';

export default class ItemsController {
    static async index(request: Request, response: Response) {
        /*
        const items = await knex('items').select('*');
    
        const serializedItems = items.map((item) => {
            return {
                id: item.id,
                title: item.title,
                image_url: `http://10.0.0.103:3333/uploads/${item.image}`,
            };
        });
    
        return response.json(serializedItems);
        */

        const repository = getRepository(Item);
        const items = await repository.find();

        return response.json(items);
    }
}
