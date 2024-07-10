import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const createContext = ({ req }:any) => {
  return {
    ...req,
    prisma,
    user: req.user,
  };
};
