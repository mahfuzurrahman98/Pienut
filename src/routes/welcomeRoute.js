import { Route } from '../../base/index.js';
import TestController from '../controllers/TestController.js';

Route.get('/', TestController, 'index');

export default Route.router;
