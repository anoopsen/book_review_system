import jwt, { Secret } from 'jsonwebtoken';
import { prisma } from '../config/database';

export const authMiddleware = {
  async requestDidStart(requestContext: any) {
    const token = requestContext.request.http.headers.authorization || '';
    if (token) {
      try {
        const jwtSecret = process.env.JWT_SECRET as string;
        const decoded = jwt.verify(token, jwtSecret) as { userId: number };
        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });
        requestContext.context.user = user;
      } catch (err) {
        console.error(err);
      }
    }
  },
};
