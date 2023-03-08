import { Route } from '../../../../base/index.js';
import TestController from '../../../controllers/TestController.js';
import UserController from '../../../controllers/UserController.js';
import AuthRoutes from './authRoutes.js';

// test routes
// Route.get('/welcome', TestController, 'index');
Route.post('/test', TestController, 'create');
Route.get('/test', TestController, '_index');
// Route.get('/test-err', TestController, 'test2');

// auth routes
Route.use('/auth', AuthRoutes);

//user routes
Route.get('/users', UserController, '_index');
Route.get('/users/:id', UserController, '_show');
Route.delete('/users/:id', UserController, '_destroy');

export default Route.router;
