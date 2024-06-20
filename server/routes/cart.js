import express from 'express';
import { add_to_cart, get_all_carts, empty_cart, remove_item_from_cart, update_item_from_cart } from '../controller/cart.js';
import middleware from '../middleware/index.js';
import token_expiration_middleware from '../middleware/auth_middleware.js';

const routes = express.Router();

routes.post('/add', token_expiration_middleware, middleware, add_to_cart);
routes.get('/get_carts', token_expiration_middleware, middleware, get_all_carts);
routes.delete('/empty/:id', token_expiration_middleware, middleware, empty_cart);
routes.delete('/delete_item/:id', token_expiration_middleware, middleware, remove_item_from_cart);
routes.put('/update_item/:id', token_expiration_middleware, middleware, update_item_from_cart);

export default routes;