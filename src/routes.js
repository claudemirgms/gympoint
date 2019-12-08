import { Router } from 'express';

import SessionController from './app/Controllers/SessionController';
import StudentsController from './app/Controllers/StudentController';
import PlanController from './app/Controllers/PlanController';
import EnrollmentController from './app/Controllers/EnrollmentController';
import CheckinController from './app/Controllers/CheckinController';
import HelpOrderController from './app/Controllers/HelpOrderController';
import AnswerController from './app/Controllers/AnswerController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/session', SessionController.store);

// Checkin
routes.post('/students/:id/checkins', CheckinController.store);
routes.get('/students/:id/checkins', CheckinController.index);

// HelpOrder
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.get('/help-orders', AnswerController.index);
routes.post('/help-orders/:id/answer', AnswerController.update);

// Authentication
routes.use(authMiddleware);

// Student
routes.post('/student', StudentsController.store);
routes.get('/students', StudentsController.index);

// Plan
routes.post('/plan', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plan/:id', PlanController.update);
routes.delete('/plan/:id/delete', PlanController.delete);

// Enrollment
routes.post('/enrollment', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.put('/enrollment/:id', EnrollmentController.update);
routes.delete('/enrollment/:id/delete', EnrollmentController.delete);

export default routes;
