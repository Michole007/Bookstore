import express from 'express';
import { get_order, place_order } from '../controller/order.js';
import middleware from '../middleware/index.js';
import token_expiration_middleware from '../middleware/auth_middleware.js';

const routes = express.Router();

routes.post('/place_order', token_expiration_middleware, middleware, place_order);
routes.get('/get_order', token_expiration_middleware, middleware, get_order);

export default routes;