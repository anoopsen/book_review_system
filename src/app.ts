import { ApolloServer } from 'apollo-server';
import { typeDefs } from './graphql/schema/schema';
import { resolvers } from './graphql/resolvers/index';
import { createContext } from './config/database';
import { authMiddleware } from './middleware/authMiddleware';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: createContext,
  plugins: [authMiddleware],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
