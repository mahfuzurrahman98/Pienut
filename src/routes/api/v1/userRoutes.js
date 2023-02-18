import Route from '../../../../base/Route.js';
import UserController from '../../../controllers/UserController.js';

Route.get('/', UserController, 'index');
Route.get('/:id', UserController, 'show');
Route.delete('/delete/:id', UserController, 'delete');
Route.post('/register', UserController, 'store');
Route.put('/update/:id', UserController, 'update');

export default Route.router;
