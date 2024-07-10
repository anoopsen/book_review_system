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
exports.reviewResolver = void 0;
const database_1 = require("../../config/database");
exports.reviewResolver = {
    Query: {
        getReviews: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { bookId }) {
            return yield database_1.prisma.review.findMany({
                where: { bookId: Number(bookId) },
            });
        }),
    },
    Mutation: {
        addReview: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { bookId, rating, comment }, { user }) {
            if (!user)
                throw new Error('Not authenticated');
            return yield database_1.prisma.review.create({
                data: { bookId: Number(bookId), rating, comment, userId: user.id },
            });
        }),
        updateReview: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { reviewId, rating, comment }, { user }) {
            if (!user)
                throw new Error('Not authenticated');
            const review = yield database_1.prisma.review.findUnique({
                where: { id: Number(reviewId) },
            });
            if (review.userId !== user.id)
                throw new Error('Not authorized');
            return yield database_1.prisma.review.update({
                where: { id: Number(reviewId) },
                data: { rating, comment },
            });
        }),
        deleteReview: (_1, _a, _b) => __awaiter(void 0, [_1, _a, _b], void 0, function* (_, { reviewId }, { user }) {
            if (!user)
                throw new Error('Not authenticated');
            const review = yield database_1.prisma.review.findUnique({
                where: { id: Number(reviewId) },
            });
            if (review.userId !== user.id)
                throw new Error('Not authorized');
            return yield database_1.prisma.review.delete({
                where: { id: Number(reviewId) },
            });
        }),
    },
};
