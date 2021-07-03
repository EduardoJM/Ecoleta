import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import path from 'path';
//import { errors } from 'celebrate';
//import errorHandler from './middlewares/errorHandler';
import createConnection from './connection';
import config from './config';
import routes from './routes';

createConnection().then(async (connection) => {
    if (!connection) {
        return;
    }

    const app = express();
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(routes);
    
    app.use('/static/avatars', express.static(path.resolve(__dirname, '..', 'static', 'avatars')));
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));

    //app.use(errors());
    //app.use(errorHandler);

    app.listen(config.port);
});
