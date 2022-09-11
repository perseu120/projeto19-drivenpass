import { Router } from "express";
import {loginController, createController} from '../controllers/authController';


const authRouter = Router();

authRouter.post('/login', loginController);
authRouter.post('/create', createController);

export default authRouter;
