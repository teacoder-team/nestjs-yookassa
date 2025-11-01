"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaError = void 0;
class YookassaError extends Error {
    constructor(code, description, data) {
        super(description);
        this.code = code;
        this.description = description;
        this.data = data;
        this.name = 'YookassaError';
    }
}
exports.YookassaError = YookassaError;
