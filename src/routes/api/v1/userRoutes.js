import { Router } from 'express';
import UserController from '../../../controllers/UserController.js';

const userRouter = Router();

userRouter.get('/', UserController.index.bind(UserController));
userRouter.get('/:id', UserController.show.bind(UserController));
userRouter.delete('/delete/:id', UserController.delete.bind(UserController));

userRouter.post('/register', UserController.store.bind(UserController));


export default userRouter;
