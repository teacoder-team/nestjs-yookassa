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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodService = void 0;
const common_1 = require("@nestjs/common");
const yookassa_http_client_1 = require("../../core/http/yookassa.http-client");
let PaymentMethodService = class PaymentMethodService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Создает сохраненный способ оплаты (payment method).
     *
     * Используется для привязки карты клиента или другого способа оплаты.
     * Требует подтверждения пользователя (redirect confirmation flow).
     *
     * @param {CreatePaymentMethodRequest} data — Данные для создания метода оплаты.
     * @returns {Promise<CreatePaymentMethodResponse>} Детали созданного payment method.
     *
     * @example Создание сохраненного метода оплаты
     * ```ts
     * const method = await this.yookassaService.paymentMethods.create({
     *   type: PaymentMethodsEnum.BANK_CARD,
     *   confirmation: {
     *     type: 'redirect',
     *     return_url: 'https://myshop.com/yookassa-return'
     *   }
     * });
     *
     * console.log(method.id, method.status, method.confirmation?.confirmation_url);
     * ```
     *
     * @example Подключение карты с редиректом
     * ```ts
     * const res = await yookassa.paymentMethods.create({
     *   type: PaymentMethodsEnum.BANK_CARD,
     *   confirmation: {
     *     type: 'redirect',
     *     return_url: 'https://example.com/success'
     *   }
     * });
     *
     * return { redirectUrl: res.confirmation.confirmation_url };
     * ```
     *
     * @see https://yookassa.ru/developers/api#create_payment_method
     */
    async create(data) {
        return this.http.post('/payment_methods', data);
    }
    /**
     * Получает сохраненный способ оплаты по ID.
     *
     * @param {string} id — Идентификатор способа оплаты.
     * @returns {Promise<PaymentMethodDetails>} Объект с деталями метода оплаты.
     *
     * @example
     * ```ts
     * const paymentMethod = await this.yookassaService.paymentMethods.getById('pm_123');
     * console.log(paymentMethod.status, paymentMethod.card?.last4);
     * ```
     *
     * @see https://yookassa.ru/developers/api#get_payment_method
     */
    async getById(id) {
        return this.http.get(`/payment_methods/${id}`);
    }
};
exports.PaymentMethodService = PaymentMethodService;
exports.PaymentMethodService = PaymentMethodService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [yookassa_http_client_1.YookassaHttpClient])
], PaymentMethodService);
