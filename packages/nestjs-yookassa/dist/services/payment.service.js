"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../interfaces");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const yookassa_constants_1 = require("../yookassa.constants");
const node_crypto_1 = require("node:crypto");
let PaymentService = class PaymentService {
    constructor(options, httpService) {
        this.options = options;
        this.httpService = httpService;
    }
    async create(paymentData) {
        var _a, _b;
        const idempotenceKey = (0, node_crypto_1.randomUUID)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${yookassa_constants_1.YOOKASSA_API_URL}payments`, paymentData, {
                headers: {
                    Authorization: this.getAuthHeader(),
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.description) ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getAll(limit = 10, from = '', to = '') {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${yookassa_constants_1.YOOKASSA_API_URL}payments`, {
                headers: {
                    Authorization: this.getAuthHeader()
                },
                params: {
                    limit,
                    from,
                    to
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getOne(paymentId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${yookassa_constants_1.YOOKASSA_API_URL}payments/${paymentId}`, {
                headers: {
                    Authorization: this.getAuthHeader()
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async capture(paymentId) {
        const idempotenceKey = (0, node_crypto_1.randomUUID)();
        try {
            const { amount } = await this.getOne(paymentId);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${yookassa_constants_1.YOOKASSA_API_URL}payments/${paymentId}/capture`, { amount }, {
                headers: {
                    Authorization: this.getAuthHeader(),
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async cancel(paymentId) {
        const idempotenceKey = (0, node_crypto_1.randomUUID)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${yookassa_constants_1.YOOKASSA_API_URL}payments/${paymentId}/cancel`, {}, {
                headers: {
                    Authorization: this.getAuthHeader(),
                    'Content-Type': 'application/json',
                    'Idempotence-Key': idempotenceKey
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    getAuthHeader() {
        return `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], PaymentService);
