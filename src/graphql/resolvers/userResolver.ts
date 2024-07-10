import bcrypt from 'bcryptjs';
import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from '../../config/database';
import { Review } from '../../interfaces/reviewInterfaces';

export const userResolver = {
  Query: {
    getMyReviews: async (_: any, __: any, { user }: Review) => {
      if (!user) throw new Error('Not authenticated');
      return await prisma.review.findMany({
        where: { userId: user.id },
      });
    },
  },
  Mutation: {
    register: async (_: any, { username, email, password }: { username: string; email: string; password: string }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      return user;
    },
    login: async (_: any, { email, password }: { email: string; password: string }) => {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new Error('User not found');
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) throw new Error('Invalid password');

      const jwtSecret = process.env.JWT_SECRET as string;
      return jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: '1d' });
    },
  },
};
