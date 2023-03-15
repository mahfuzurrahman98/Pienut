import { Auth, Route } from '../../../../base/index.js';
import AuthController from '../../../controllers/AuthController.js';

Route.post('/register', AuthController, 'register');
Route.get('/profile', AuthController, 'profile', Auth.isAuthenticated);
Route.post('/login', AuthController, 'login');
Route.post('/refresh-token', AuthController, 'getRefreshToken');
Route.post('/logout', AuthController, 'logout');

export default Route.router;
