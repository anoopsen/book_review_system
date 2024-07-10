import { userResolver } from './userResolver';
import { bookResolver } from './bookResolver';
import { reviewResolver } from './reviewResolver';

export const resolvers = {
  Query: {
    ...userResolver.Query,
    ...bookResolver.Query,
    ...reviewResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
    ...bookResolver.Mutation,
    ...reviewResolver.Mutation,
  },
};
