import { Router } from 'express';
import UserController from '../../../controllers/UserController.js';

const userRouter = Router();

userRouter.get('/', UserController.index.bind(UserController));
userRouter.get('/:id', UserController.show.bind(UserController));



export default userRouter;
