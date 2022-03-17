import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Item } from '../entities';

export default class ItemsController {
    static async index(request: Request, response: Response) {
        const repository = getRepository(Item);
        const items = await repository.find();

        const serializedItems = items.map((item) => item.serialize(request));

        return response.json(serializedItems);
    }
}
