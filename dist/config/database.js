"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
const createContext = ({ req }) => {
    return Object.assign(Object.assign({}, req), { prisma: exports.prisma, user: req.user });
};
exports.createContext = createContext;
