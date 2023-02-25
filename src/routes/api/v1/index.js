import { Route } from '../../../../base/index.js';
import AuthController from '../../../controllers/AuthController.js';
import UserController from '../../../controllers/UserController.js';
// import authRoutes from './authRoutes.js';
// import userRoutes from './userRoutes.js';

// const router = Route.router;

// Route.use('/auth', authRoutes);
// Route.use('/users', userRoutes);

// Route.post('/auth/register', AuthController, 'register');
// Route.post('/login', AuthController, 'login');

// Route.post('/register', AuthController, 'register');
//

const route = new Route();

route.withPrefix('/auth');
route.post('/register', AuthController, 'register');
route.post('/login', AuthController, 'login');
console.log('authRoute: ', route);

route.withPrefix('/users');
route.get('/', UserController, 'index');
console.log('userRoute: ', route);

export default route;
