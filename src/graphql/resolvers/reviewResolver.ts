import { prisma } from '../../config/database';
import { Review } from '../../interfaces/reviewInterfaces';

export const reviewResolver = {
  Query: {
    getReviews: async (_: any, { bookId }: { bookId: string }) => {
      return await prisma.review.findMany({
        where: { bookId: Number(bookId) },
      });
    },
  },
  Mutation: {
    addReview: async (_: any, { bookId, rating, comment }: Review, { user }: Review) => {
      if (!user) throw new Error('Not authenticated');
      return await prisma.review.create({
        data: { bookId: Number(bookId), rating, comment, userId: user.id },
      });
    },
    updateReview: async (_: any, { reviewId, rating, comment }: { reviewId: number; rating?: number; comment?: string }, { user }: Review) => {
      if (!user) throw new Error('Not authenticated');
      const review = await prisma.review.findUnique({
        where: { id: Number(reviewId) },
      });
      if (review.userId !== user.id) throw new Error('Not authorized');
      return await prisma.review.update({
        where: { id: Number(reviewId) },
        data: { rating, comment },
      });
    },
    deleteReview: async (_: any, { reviewId }: { reviewId: number}, { user }: Review) => {
      if (!user) throw new Error('Not authenticated');
      const review = await prisma.review.findUnique({
        where: { id: Number(reviewId) },
      });
      if (review.userId !== user.id) throw new Error('Not authorized');
      return await prisma.review.delete({
        where: { id: Number(reviewId) },
      });
    },
  },
};
