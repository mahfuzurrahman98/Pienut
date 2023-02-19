import Route from '../../../../base/Route.js';
import UserController from '../../../controllers/UserController.js';

Route.get('/', UserController, 'index');
Route.get('/:id', UserController, 'show');
Route.delete('/:id', UserController, 'delete');
Route.put('/:id', UserController, 'update');

export default Route.router;
