import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { getRepository } from 'typeorm';
import { User, Item, Point, ItemToPoint } from '../entities';
import { httpStatusCode, outputErrors } from '../constants';

interface PointCreateBody {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    latitude: number;
    longitude: number;
    city: string;
    uf: string;
    items: string;
}

interface PointShowParams extends ParamsDictionary {
    id: string;
}

export default class PointsController {
    static async create(request: Request<any, any, PointCreateBody>, response: Response) {
        if (!request.user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.USER_NOT_FOUND);
        }
        const userId = request.user.id;
        const userRepo = getRepository(User);
        const user = await userRepo.findOne({ where: { id: userId }});
        if (!user) {
            return response
                .status(httpStatusCode.HTTP_400_BAD_REQUEST)
                .json(outputErrors.responses.USER_NOT_FOUND);
        }

        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;

        const pointRepo = getRepository(Point);
        const point = new Point();
        point.image = image;
        point.name = name;
        point.email = email;
        point.whatsapp = whatsapp;
        point.latitude = latitude;
        point.longitude = longitude;
        point.city = city;
        point.uf = uf;
        point.user = user;

        try {
            const result = await pointRepo.save(point);

            const itemRepo = getRepository(Item);

            const ids = items
                .split(',')
                .map((item) => item.trim())
                .map((item) => parseInt(item, 10));
            const itemMapRepo = getRepository(ItemToPoint);
            for (let i = 0; i < ids.length; i += 1) {
                const toMap = await itemRepo.findOne({ where: { id: ids[i] }});
                if (toMap) {
                    const reg = new ItemToPoint();
                    reg.point = result;
                    reg.item = toMap;
                    await itemMapRepo.save(reg);
                }
            }

            const selectResult = await pointRepo.findOne({
                where: { id: result.id },
                relations: ['items', 'items.item'],
            });
            if (!selectResult) {
                return response
                    .status(httpStatusCode.HTTP_201_CREATED)
                    .json(result.serialize(request));
            }
            return response
                    .status(httpStatusCode.HTTP_201_CREATED)
                    .json(selectResult.serialize(request));
        } catch (err) {
            return response
                .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                .json(outputErrors.responses.UNKNOWN_SAVE_ERROR);
        }
    }

    static async show(request: Request<PointShowParams, any, any>, response: Response) {
        const { id } = request.params;
        if (!id) {
            return response
                .status(httpStatusCode.HTTP_404_NOT_FOUND)
                .json(outputErrors.responses.POINT_NOT_FOUND);
        }
        const pointRepo = getRepository(Point);
        const point = await pointRepo.findOne({
            where: { id },
            relations: ['items', 'items.item']
        });
        if (!point) {
            return response
                .status(httpStatusCode.HTTP_404_NOT_FOUND)
                .json(outputErrors.responses.POINT_NOT_FOUND);
        }
        return response.json(point.serialize(request));
    }

    static async delete(request: Request<PointShowParams, any, any>, response: Response) {
        const pointRepo = getRepository(Point);
        try {
            const result = await pointRepo.delete({ id: parseInt(request.params.id, 10) });
            if (result.affected) {
                return response.send();
            } else {
                return response
                    .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                    .json(outputErrors.responses.UNKNOWN_DELETE_ERROR);
            }
        } catch(e) {
            return response
                .status(httpStatusCode.HTTP_500_INTERNAL_SERVER_ERROR)
                .json(outputErrors.responses.UNKNOWN_DELETE_ERROR);
        }
    }

    /*
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

    async update(request: Request, response: Response) {
        const {
            originalemail,
            name,
            email,
            password,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items,
        } = request.body;
        
        // make the new e-mail as unique
        if (email && email != '' && email !== originalemail) {
            const hasSameEmail = await knex('points').where('email', email);
            if (hasSameEmail.length > 0) {
                return response.status(400)
                    .json({
                        error: true,
                        information: {
                            in: 'create_point',
                            code: 'EMAIL_ALREADY_REGISTERED',
                            message: 'Only one point per e-mail permited.',
                        },
                    });
            }
        }
        let passwordHash = undefined;
        // create the password hash 
        if (password && password !== '') {
            passwordHash = await bcrypt.hash(password, 10);
        }
        // initialize the knex transaction
        const trx = await knex.transaction();

        const rawPoint = await trx('points')
            .where('email', originalemail)
            .first();
        if (!rawPoint) {
            trx.rollback();
            return response.status(400).json({
                message: 'raw point not found.',
            });
        }
        const pointId = rawPoint.id;

        let image : undefined | string = undefined;
        if (request.file) {
            // an new file is uploaded
            fs.unlinkSync(path.join(__dirname, '..', '..', 'uploads', 'images', rawPoint.image));
            image = request.file.filename;
        }

        const point = {
            name,
            email,
            password: passwordHash,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            image,
        };

        const result = await trx('points')
            .where('id', pointId)
            .update(point);

        if (items && items !== '') {
            await trx('point_items')
                .where('point_id', pointId)
                .delete();

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
        }

        const outputPoint = await trx('points')
            .where('id', pointId)
            .first();

        const serializedOutputPoint = {
            ...outputPoint,
            password: undefined,
            image_url: `http://10.0.0.103:3333/uploads/images/${outputPoint.image}`,
        };

        const outputItems = await trx('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', pointId)
            .select('items.title', 'items.id');

        await trx.commit();

        return response.json({
            point: serializedOutputPoint,
            items: outputItems,
        });
    }
    */
}
