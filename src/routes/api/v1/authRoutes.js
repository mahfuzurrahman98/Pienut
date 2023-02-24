import Route from '../../../../base/Route.js';
import AuthController from '../../../controllers/AuthController.js';

// Route.post('/register', AuthController, 'register');
// Route.post('/login', AuthController, 'login');
// Route.post('/profile', AuthController, 'profile');
// Route.post('/logout', AuthController, 'logout');

// is it possible to pass middleware to Route.post() and then execute it before the controller action?
Route.post('/fun', ['notZero', 'isEven'], AuthController, 'fun');

export default Route.router;
