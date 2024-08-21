/*
----------------------------------------------------------------------------------------
  En este archivo se realizara la generación de los Token mediante la librería
  jsonwebtoken, este Token lo que nos genera es seguridad de tal manera que me 
  identifique al usuario como único en un lapso o tiempo dado.
----------------------------------------------------------------------------------------
*/

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const token = <string>req.headers['auth'];
  let jwtPayload;

  try {

    jwtPayload = <any>jwt.verify(token, config.jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (e) {
  
    return res.status(401).json({ message: 'Not Authorized' });
    
  }

  const { id } = jwtPayload;
  const newToken = jwt.sign({ id }, config.jwtSecret, { expiresIn: '3m' });
  res.setHeader('token', newToken);
  // Call next
  next();
};
