import * as userRoutes from './user';
import axios from './axios';

export { default as axios } from './axios';

export const user = {
    ...userRoutes,
};

export default axios; // TODO: remove this export. this is only for compatibility for now
