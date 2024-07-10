import { ApolloServer } from 'apollo-server';
import { typeDefs } from '../graphql/schema/schema';
import { resolvers } from '../graphql/resolvers/index';
import { createContext } from '../config/database';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

describe('Book Resolver', () => {
  it('should fetch all books', async () => {
    const GET_BOOKS = `
      query {
        getBooks {
          id
          title
          author
          publishedYear
        }
      }
    `;

    const res = await server.executeOperation({ query: GET_BOOKS });
    expect(res.data!.getBooks).toBeDefined();
  });
});
