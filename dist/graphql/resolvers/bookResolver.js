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
exports.bookResolver = void 0;
const database_1 = require("../../config/database");
exports.bookResolver = {
    Query: {
        getBooks: () => __awaiter(void 0, void 0, void 0, function* () {
            return yield database_1.prisma.book.findMany();
        }),
        getBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield database_1.prisma.book.findUnique({
                where: { id: Number(id) },
            });
        }),
    },
    Mutation: {
        addBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { title, author, publishedYear }) {
            return yield database_1.prisma.book.create({
                data: { title, author, publishedYear },
            });
        }),
    },
};
