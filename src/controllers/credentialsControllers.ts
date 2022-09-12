import { Response, Request } from "express";
import { createCredentialService, getAllCredentialService, getOneCredentialService } from "../services/credentialService";


export async function createCredentialController(req: Request, res: Response){

    const title: string = req.body.titulo
    const url: string = req.body.url
    const userName: string = req.body.userName
    const password: string = req.body.senha
    const userId: number = req.params.id

    createCredentialService(title, url, userName, password, userId)
 
    res.sendStatus(201);
}

export async function getCredentialIdController(req: Request, res: Response){
    const userId: number = req.params.id

    const allCredentialresult = getAllCredentialService(userId);

    res.status(201).send(allCredentialresult);
}

export async function getCredentialsController(req: Request, res: Response) {

    const userId: number = req.params.id
    const credentialId: number = req.body.id

    getOneCredentialService(credentialId, userId);
    
}