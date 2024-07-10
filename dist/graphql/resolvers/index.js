"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const userResolver_1 = require("./userResolver");
const bookResolver_1 = require("./bookResolver");
const reviewResolver_1 = require("./reviewResolver");
exports.resolvers = {
    Query: Object.assign(Object.assign(Object.assign({}, userResolver_1.userResolver.Query), bookResolver_1.bookResolver.Query), reviewResolver_1.reviewResolver.Query),
    Mutation: Object.assign(Object.assign(Object.assign({}, userResolver_1.userResolver.Mutation), bookResolver_1.bookResolver.Mutation), reviewResolver_1.reviewResolver.Mutation),
};
