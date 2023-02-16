import { Router } from 'express';
import UserController from '../../../controllers/UserController.js';


const userRouter = Router();

userRouter.get('/', UserController.getAll);


export default userRouter;
