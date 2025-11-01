"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YOOKASSA_HEADERS = exports.YOOKASSA_API_URL = void 0;
const crypto_1 = require("crypto");
exports.YOOKASSA_API_URL = 'https://api.yookassa.ru/v3';
exports.YOOKASSA_HEADERS = {
    'Content-Type': 'application/json',
    'Idempotence-Key': (0, crypto_1.randomUUID)()
};
