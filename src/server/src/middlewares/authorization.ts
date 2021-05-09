import { NextFunction, Request, Response } from 'express';
import firebase from '../config/firebase';

const verifyAuthorization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return res.status(403).json({
      status: 403,
      message: 'FORBIDDEN',
    });
  }

  try {
    const [_, token] = authorization.split('Bearer ');
    if (token) {
      await firebase.auth().verifyIdToken(token);
      return next();
    } else {
      return res.status(401).json({
        status: 401,
        message: 'UNAUTHORIZED',
      });
    }
  } catch (error) {
    return res.status(401).json({
      status: 401,
      message: 'UNAUTHORIZED',
    });
  }
};

export default verifyAuthorization;
