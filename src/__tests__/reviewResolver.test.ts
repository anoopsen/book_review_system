import { ApolloServer } from 'apollo-server';
import { typeDefs } from '../graphql/schema/schema';
import { resolvers } from '../graphql/resolvers/index';
import { createContext } from '../config/database';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

describe('Review Resolver', () => {
  it('should fetch reviews for a book', async () => {
    const GET_REVIEWS = `
      query($bookId: ID!) {
        getReviews(bookId: $bookId) {
          id
          rating
          comment
          createdAt
        }
      }
    `;

    const res = await server.executeOperation({ query: GET_REVIEWS, variables: { bookId: 1 } });
    expect(res.data!.getReviews).toBeDefined();
  });
});
