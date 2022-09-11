import { UserInsertData } from '../repositories/authRepository';
import { Response, Request } from "express";
import { creatUser, login } from '../services/authService';

export async function loginController(req: Request, res: Response){

    const email = String(req.body.email);
    const senha = String(req.body.senha);

    const token = await login(email, senha);
 
    res.status(200).send(token);
}

export async function createController(req: Request, res: Response) {
    const UserInsertData:UserInsertData = req.body;

    await creatUser(UserInsertData);

    res.sendStatus(201);
}