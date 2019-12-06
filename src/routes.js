import { Router } from 'express';

import SessionController from './app/Controllers/SessionController';
import StudentsController from './app/Controllers/StudentController';
import PlanController from './app/Controllers/PlanController';
import EnrollmentController from './app/Controllers/EnrollmentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

routes.use(authMiddleware);

// Student
routes.post('/student', StudentsController.store);
routes.get('/students', StudentsController.index);

// Plan
routes.post('/plan', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plan/:id', PlanController.update);
routes.delete('/delplan/:id', PlanController.delete);

// Enrollment
routes.post('/enrollment', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/delenrollment/:id', EnrollmentController.delete);

export default routes;
