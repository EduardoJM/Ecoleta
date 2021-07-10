import * as userRoutes from './user';
import * as itemsRoutes from './items';
import axios from './axios';

export { default as axios } from './axios';

export const user = {
    ...userRoutes,
};

export const items = {
    ...itemsRoutes,
};

export default axios; // TODO: remove this export. this is only for compatibility for now
