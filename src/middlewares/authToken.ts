export default async function authorizationToken(req,res,next){

    // const { authorization } = req.headers;

    // if(!authorization){
    //     res.sendStatus(401);
    //     return;
    // }

    // const token = authorization?.replace('Bearer ', '');

    // const {rows: user} = await connection.query('SELECT * FROM sessions WHERE token = $1', [token]);

    // if(user.length < 1){
        
    //     res.status(401).send("token invalido ou fora da validade")
    //     return;
    // }
    
    // res.locals.idUsers = user[0].idUsers;
    
    // next();
}

import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

dotenv.config();

export function validateTokenJWT() {

  return (req: Request, res: Response, next: NextFunction) => {

    const { authorization } = req.headers

    const token = authorization?.replace('Bearer ', '');

    if (!token) {
      throw res.sendStatus(401);
    }

    const SECRET: string = process.env.TOKEN_SECRET_KEY ?? '';

    try {
      jwt.verify(token, SECRET);

      next();

    } catch (error) {
        throw res.sendStatus(401);
    }

  };
}