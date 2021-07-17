import * as serviceApi from './api';
import * as serviceIBGE from './ibge';

export const api = { ...serviceApi };
export const ibge = { ...serviceIBGE };

