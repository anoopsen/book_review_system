"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("./graphql/schema/schema");
const index_1 = require("./graphql/resolvers/index");
const database_1 = require("./config/database");
const authMiddleware_1 = require("./middleware/authMiddleware");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: index_1.resolvers,
    context: database_1.createContext,
    plugins: [authMiddleware_1.authMiddleware],
});
server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
