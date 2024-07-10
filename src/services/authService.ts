import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from '../config/database';
import dotenv from 'dotenv';
dotenv.config();

export const register = async (username: string, email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
};

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error('User not found');
  
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid password');
  
  const jwtSecret = process.env.JWT_SECRET as string; 
  return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1d' });
};
