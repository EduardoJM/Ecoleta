import * as userRoutes from './user';
import * as itemsRoutes from './items';
import * as pointRoutes from './point';
import axios from './axios';

export { default as axios } from './axios';

export const user = {
    ...userRoutes,
};

export const items = {
    ...itemsRoutes,
};

export const point = {
    ...pointRoutes,
};

export default axios; // TODO: remove this export. this is only for compatibility for now
