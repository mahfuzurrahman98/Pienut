import { Route } from '../../../../base/index.js';
// import ItemController from '../../../controllers/ItemController.js';
// import UserController from '../../../controllers/UserController.js';
import AuthRoutes from './authRoutes.js';

// auth routes
Route.use('/auth', AuthRoutes);

// // user routes
// Route.get('/users', UserController, '_index');
// Route.get('/users/:id', UserController, '_show');
// Route.delete('/users/:id', UserController, '_destroy');

// // items routes
// Route.get('/items', ItemController, '_index');
// Route.get('/items/:id', ItemController, '_show');
// Route.post('/items', ItemController, '_store');

export default Route.router;
