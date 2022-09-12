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