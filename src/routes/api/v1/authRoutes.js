import Route from '../../../../base/Route.js';
import AuthController from '../../../controllers/AuthController.js';
import auth from '../../../middlewares/auth.js';

Route.post('/register', AuthController, 'register');
Route.post('/login', AuthController, 'login');
Route.post('/profile', AuthController, 'profile');
Route.post('/logout', AuthController, 'logout');

Route.post('/fun', [auth.notZero, auth.isEven], AuthController, 'fun');

export default Route.router;
