import { prisma } from '../config/database';

export const getReviews = async (bookId: any) => {
  return await prisma.review.findMany({
    where: { bookId: Number(bookId) },
  });
};

export const addReview = async (bookId: string, rating: number, comment: string, userId: string) => {
  return await prisma.review.create({
    data: { bookId: Number(bookId), rating, comment, userId },
  });
};

export const updateReview = async (reviewId: string, rating: number, comment: string, userId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
  });
  if (review.userId !== userId) throw new Error('Not authorized');
  return await prisma.review.update({
    where: { id: Number(reviewId) },
    data: { rating, comment },
  });
};

export const deleteReview = async (reviewId: string, userId: string) => {
  const review = await prisma.review.findUnique({
    where: { id: Number(reviewId) },
  });
  if (review.userId !== userId) throw new Error('Not authorized');
  return await prisma.review.delete({
    where: { id: Number(reviewId) },
  });
};
