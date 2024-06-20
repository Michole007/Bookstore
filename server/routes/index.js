import express from 'express';
import { signup, signin, verify_email } from '../controller/index.js';

const routes = express.Router();

routes.post('/signup', signup);
routes.post('/signin', signin);
routes.get('/verify_email/:token', verify_email);

export default routes;