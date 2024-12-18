import jwt from 'jsonwebtoken';

export const makeNewToken = (username: string) => {
    const secretKey = process.env.JWT_SECRET_KEY || '';
    return jwt.sign({ username }, secretKey, { expiresIn: '1h' });    
}