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
exports.deleteReview = exports.updateReview = exports.addReview = exports.getReviews = void 0;
const database_1 = require("../config/database");
const getReviews = (bookId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.review.findMany({
        where: { bookId: Number(bookId) },
    });
});
exports.getReviews = getReviews;
const addReview = (bookId, rating, comment, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield database_1.prisma.review.create({
        data: { bookId: Number(bookId), rating, comment, userId },
    });
});
exports.addReview = addReview;
const updateReview = (reviewId, rating, comment, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield database_1.prisma.review.findUnique({
        where: { id: Number(reviewId) },
    });
    if (review.userId !== userId)
        throw new Error('Not authorized');
    return yield database_1.prisma.review.update({
        where: { id: Number(reviewId) },
        data: { rating, comment },
    });
});
exports.updateReview = updateReview;
const deleteReview = (reviewId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const review = yield database_1.prisma.review.findUnique({
        where: { id: Number(reviewId) },
    });
    if (review.userId !== userId)
        throw new Error('Not authorized');
    return yield database_1.prisma.review.delete({
        where: { id: Number(reviewId) },
    });
});
exports.deleteReview = deleteReview;
