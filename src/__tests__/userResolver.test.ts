import { ApolloServer } from 'apollo-server';
import { typeDefs } from '../graphql/schema/schema';
import { resolvers } from '../graphql/resolvers/index';
import { createContext } from '../config/database';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
});

describe('User Resolver', () => {
  it('should register a new user', async () => {
    const REGISTER_USER = `
      mutation($username: String!, $email: String!, $password: String!) {
        register(username: $username, email: $email, password: $password) {
          id
          username
          email
        }
      }
    `;

    const res = await server.executeOperation({
      query: REGISTER_USER,
      variables: { username: 'testuser', email: 'test@example.com', password: 'password' },
    });

    expect(res.data!.register).toBeDefined();
    expect(res.data!.register.username).toBe('testuser');
  });
});
