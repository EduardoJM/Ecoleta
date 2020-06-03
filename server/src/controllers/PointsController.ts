import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        // cidades, uf, items (Query params)
        const { city, uf, items } = request.query;
        
        let selectQuery = knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id');

        // if items exists, then use this
        if (items) {
            const parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim()));
                
            selectQuery = selectQuery
                .whereIn('point_items.item_id', parsedItems)
        }
        // if city exists, then use this
        if (city) {
            selectQuery = selectQuery
                .where('city', String(city))
        }
        // if uf exists, then use this
        if (uf) {
            selectQuery = selectQuery
                .where('uf', String(uf));
        }
        selectQuery = selectQuery
            .distinct()
            .select('points.*');

        let points = await selectQuery;
        
        return response.json(points);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({
                message: 'point not found.',
            });
        }

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        
        return response.json({ point, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;
    
        const trx = await knex.transaction();

        const point = {
            image: 'https://images.unsplash.com/photo-1518792528501-352f829886dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const insertedIds = await trx('points').insert(point);
        const pointId = insertedIds[0];
    
        const pointItems = items.map((itemId: number) => {
            return {
                item_id: itemId,
                point_id: pointId,
            }
        });
    
        await trx('point_items').insert(pointItems);

        await trx.commit();
    
        return response.json({
            id: pointId,
            ... point,
        });
    }
}

export default PointsController;
