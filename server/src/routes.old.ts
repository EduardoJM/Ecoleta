import express from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import validation from './middlewares/validation';
import authMiddleware from './middlewares/auth';

import PointsController from './controllers/PointsController';
//import ItemsController from './controllers/ItemsController';
import AuthController from './controllers/AuthController';

const routes = express.Router();
const upload = multer(multerConfig);

const pointsController = new PointsController();
//const itemsController = new ItemsController();
const authController = new AuthController();

//routes.get('/items', itemsController.index);
routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

routes.post(
    '/points/update',
    upload.single('image'),
    authMiddleware,
    pointsController.update
);

routes.post('/authenticate', authController.index);

routes.post(
    '/points',
    upload.single('image'),
    validation,
    pointsController.create
);

export default routes;
