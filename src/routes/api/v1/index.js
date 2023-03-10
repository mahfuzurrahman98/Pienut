import { Route } from '../../../../base/index.js';
import ItemController from '../../../controllers/ItemController.js';
import TestController from '../../../controllers/TestController.js';
import UserController from '../../../controllers/UserController.js';
import AuthRoutes from './authRoutes.js';

// test routes
// Route.get('/welcome', TestController, 'index');
Route.post('/test', TestController, 'create');
Route.get('/test', TestController, '_index');
// Route.get('/test-err', TestController, 'test2');

// auth routes

//user routes
Route.get('/users', UserController, '_index');
Route.get('/users/:id', UserController, '_show');
Route.delete('/users/:id', UserController, '_destroy');

// items routes
Route.get('/items', ItemController, '_index');
Route.get('/items/:id', ItemController, '_show');
Route.post('/items', ItemController, '_store');

Route.use('/auth', AuthRoutes);

export default Route.router;
