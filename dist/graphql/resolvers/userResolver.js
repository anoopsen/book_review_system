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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = require("../../config/database");
exports.userResolver = {
    Query: {
        getMyReviews: (_1, __1, _a) => __awaiter(void 0, [_1, __1, _a], void 0, function* (_, __, { user }) {
            if (!user)
                throw new Error('Not authenticated');
            return yield database_1.prisma.review.findMany({
                where: { userId: user.id },
            });
        }),
    },
    Mutation: {
        register: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { username, email, password }) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield database_1.prisma.user.create({
                data: { username, email, password: hashedPassword },
            });
            return user;
        }),
        login: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            const user = yield database_1.prisma.user.findUnique({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const isValid = yield bcryptjs_1.default.compare(password, user.password);
            if (!isValid)
                throw new Error('Invalid password');
            const jwtSecret = process.env.JWT_SECRET;
            return jsonwebtoken_1.default.sign({ userId: user.id }, jwtSecret, { expiresIn: '1d' });
        }),
    },
};
