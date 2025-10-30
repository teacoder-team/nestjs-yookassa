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
exports.RefundService = void 0;
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../interfaces");
const axios_1 = require("@nestjs/axios");
const payment_service_1 = require("./payment.service");
const rxjs_1 = require("rxjs");
const node_crypto_1 = require("node:crypto");
const yookassa_constants_1 = require("../yookassa.constants");
let RefundService = class RefundService {
    constructor(options, httpService, paymentService) {
        this.options = options;
        this.httpService = httpService;
        this.paymentService = paymentService;
    }
    async create(refundData) {
        var _a, _b;
        const idempotenceKey = (0, node_crypto_1.randomUUID)();
        try {
            const { amount } = await this.paymentService.getOne(refundData.payment_id);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${yookassa_constants_1.YOOKASSA_API_URL}refunds`, {
                payment_id: refundData.payment_id,
                amount,
                description: refundData.description
            }, {
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
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${yookassa_constants_1.YOOKASSA_API_URL}refunds`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
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
    async getOne(refundId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${yookassa_constants_1.YOOKASSA_API_URL}refunds/${refundId}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
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
exports.RefundService = RefundService;
exports.RefundService = RefundService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService,
        payment_service_1.PaymentService])
], RefundService);
