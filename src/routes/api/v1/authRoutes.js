import { Route } from '../../../../base/index.js';
import AuthController from '../../../controllers/AuthController.js';

Route.post('/register', AuthController, 'register');
Route.post('/login', AuthController, 'login');
Route.post('/profile', AuthController, 'profile');
Route.post('/logout', AuthController, 'logout');

export default Route.router;
