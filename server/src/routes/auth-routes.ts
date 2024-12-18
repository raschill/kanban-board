import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// import { makeNewToken } from '../helpers/index.js';

export const login = async (req: Request, res: Response) => {
  // TODO: If the user exists and the password is correct, return a JWT token
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
  });

  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password.' });
  }

  const passwordIsValid = await bcrypt.compare(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).json({ message: 'Authentication failed' });
  }

  const token = jwt.sign(
    {username: user.username},
    process.env.JWT_SECRET_KEY as string,
    {expiresIn: '1h'}
  );

  return res.json({ token });
}

catch (error) {
  console.error('Login failure due to error:', error);
  return res.status(500).json({message: 'Servor error, oopsie!'});
}

};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
