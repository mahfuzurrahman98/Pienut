import { Auth, Route } from '../../../../base/index.js';
import UserController from '../../../controllers/UserController.js';

Route.get('/', UserController, '_index', Auth.isAuthenticated);
Route.get('/:id', UserController, 'show');
Route.delete('/:id', UserController, 'delete');
Route.put('/:id', UserController, 'update');

export default Route.router;
