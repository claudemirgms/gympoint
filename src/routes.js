import { Router } from 'express';

import SessionController from './app/Controllers/SessionController';
import StudentsController from './app/Controllers/StudentsController';
import PlanController from './app/Controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);
routes.post('/student', StudentsController.store);

routes.post('/plan', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plan/:id', PlanController.update);
routes.delete('/deleteplan/:id', PlanController.delete);

export default routes;
