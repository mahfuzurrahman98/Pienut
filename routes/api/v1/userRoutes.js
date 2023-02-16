import UserController from '../../../controllers/UserController.js';

export default function (router) {
  router.get('/users', UserController.getAll);
}