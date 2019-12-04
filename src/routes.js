import { Router } from 'express';

import SessionController from './app/Controllers/SessionController';
import StudentsController from './app/Controllers/StudentsController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);
routes.use(authMiddleware);
routes.post('/student', StudentsController.store);

export default routes;
