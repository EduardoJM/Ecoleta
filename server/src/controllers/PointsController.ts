import { Request, Response, query } from 'express';
import knex from '../database/connection';

class PointsController {
    async index(request: Request, response: Response) {
        // cidades, uf, items (Query params)
        const { city, uf, items, ignoreItems, returnItems, } = request.query;
        
        let query = knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id');

        if (!ignoreItems) {
            const parsedItems = String(items)
                .split(',')
                .map(item => Number(item.trim()));

            query = query
                .whereIn('point_items.item_id', parsedItems);
        }

        query = query
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');
        
        const points = await query;

        let serializedPoints = points.map((point) => {
            return {
                ...point,
                image_url: `http://10.0.0.103:3333/uploads/images/${point.image}`,
            };
        });

        if (returnItems) {
            const promisingData = Promise.all(serializedPoints.map(async (point) => {
                const fetchedItems = await knex('items')
                    .join('point_items', 'items.id', '=', 'point_items.item_id')
                    .where('point_items.point_id', point.id)
                    .select('items.title');
                const newPoint = {
                    point,
                    items: fetchedItems,
                };
                return newPoint;
            }));
            
            serializedPoints = await promisingData;
        }
        
        return response.json(serializedPoints);
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if (!point) {
            return response.status(400).json({
                message: 'point not found.',
            });
        }

        const serializedPoint = {
            ...point,
            image_url: `http://10.0.0.103:3333/uploads/images/${point.image}`,
        };

        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.title');
        
        return response.json({ point: serializedPoint, items });
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
            image: request.file.filename,
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
    
        const pointItems = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((itemId: number) => {
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
