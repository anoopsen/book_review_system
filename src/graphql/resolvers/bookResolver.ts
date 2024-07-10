import { prisma } from '../../config/database';

export const bookResolver = {
  Query: {
    getBooks: async () => {
      return await prisma.book.findMany();
    },
    getBook: async (_: any, { id }:{ id: number }) => {
      return await prisma.book.findUnique({
        where: { id: Number(id) },
      });
    },
  },
  Mutation: {
    addBook: async (_: any, { title, author, publishedYear }: any) => {
      return await prisma.book.create({
        data: { title, author, publishedYear },
      });
    },
  },
};
