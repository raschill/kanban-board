import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object

  const authHeader = req.headers.authorization;
  const token= authHeader && authHeader.split('')[1];

  if(!token) {
    return res.sendStatus(401);
  }

  const secretKey= process.env.JWT_SECRET_KEY;
  if(!secretKey) {
    throw new Error('Secret Key is not defined');
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if(err) {
      return res.sendStatus(403);
    }
    req.user= decoded as JwtPayload;
    return next();
  });
  return;
};
