"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err) => {
    console.error(err);
    return { message: err.message, code: err.extensions.code };
};
exports.errorHandler = errorHandler;
