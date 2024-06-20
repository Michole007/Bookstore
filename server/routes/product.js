import express from 'express';
import { all_products, search_for_an_item } from '../controller/products.js';
import middleware from '../middleware/index.js';
import authMiddleware from '../middleware/auth_middleware.js';

const routes = express.Router();

routes.get('/all_products', authMiddleware, all_products);
routes.get('/search', authMiddleware, middleware, search_for_an_item);

export default routes;