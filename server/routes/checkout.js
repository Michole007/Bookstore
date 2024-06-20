import express from 'express';
import { create_checkout_session, verify_payment_status } from '../controller/checkout.js';
import middleware from '../middleware/index.js';
import auth_middleware from '../middleware/auth_middleware.js'

const routes = express.Router();

routes.post('/create_checkout_session', auth_middleware, middleware, create_checkout_session);
routes.put('/verify_payment_status', auth_middleware, middleware, verify_payment_status);

export default routes;