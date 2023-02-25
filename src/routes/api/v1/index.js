import { Route } from '../../../../base/index.js';
import TestController from '../../../controllers/TestController.js';
import UserController from '../../../controllers/UserController.js';
import AuthRoutes from './authRoutes.js';

// test routes
Route.get('/welcome', TestController, 'index');
Route.get('/test', TestController, 'test');

// auth routes
Route.use('/auth', AuthRoutes);

//user routes
Route.get('/users', UserController, 'index');
export default Route.router;
