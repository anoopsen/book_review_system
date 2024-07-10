"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const schema_1 = require("../graphql/schema/schema");
const index_1 = require("../graphql/resolvers/index");
const database_1 = require("../config/database");
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.typeDefs,
    resolvers: index_1.resolvers,
    context: database_1.createContext,
});
describe('Book Resolver', () => {
    it('should fetch all books', () => __awaiter(void 0, void 0, void 0, function* () {
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
        const res = yield server.executeOperation({ query: GET_BOOKS });
        expect(res.data.getBooks).toBeDefined();
    }));
});
