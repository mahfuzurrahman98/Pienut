import passport from 'passport';
import { Route } from '../../../../base/index.js';
import AuthController from '../../../controllers/AuthController.js';

// const loginMiddleware = (req, res, next) => {
//   passport.authenticate('local', { session: false });

//   next();
// };

Route.post('/register', AuthController, 'register');

Route.post('/login', AuthController, 'login', passport.authenticate('local'));

Route.post('/profile', AuthController, 'profile');
Route.post('/logout', AuthController, 'logout');

export default Route.router;
