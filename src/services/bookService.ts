import { prisma } from '../config/database';

export const getBooks = async () => {
  return await prisma.book.findMany();
};

export const getBook = async (id: string) => {
  return await prisma.book.findUnique({
    where: { id: Number(id) },
  });
};

export const addBook = async (title: string, author: string, publishedYear: string) => {
  return await prisma.book.create({
    data: { title, author, publishedYear },
  });
};
