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
exports.YookassaService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const uuid_1 = require("uuid");
const interfaces_1 = require("./interfaces");
const yookassa_constants_1 = require("./yookassa.constants");
let YookassaService = class YookassaService {
    constructor(options, httpService) {
        this.options = options;
        this.httpService = httpService;
        this.shopId = options.shopId;
        this.apiKey = options.apiKey;
        this.apiUrl = yookassa_constants_1.DEFAULT_URL;
    }
    /**
     * Создает платеж через YooKassa.
     * Этот метод отправляет запрос на создание нового платежа с данными из `paymentData`.
     * Возвращает информацию о созданном платеже.
     *
     * @param {PaymentCreateRequest} paymentData - Данные для создания платежа.
     * @returns {Promise<PaymentDetails>} Ответ от API с деталями платежа.
     *
     * @example
     * ```ts
     * const paymentData: PaymentCreateRequest = {
     *   amount: {
     *     value: 1000,
     *     currency: 'RUB'
     *   },
     *   description: 'Test payment',
     *   payment_method_data: {
     *	   type: PaymentMethodsEnum.yoo_money,
     *	 },
     *	 confirmation: {
     *     type: 'redirect',
     *     return_url: 'https://example.com/thanks'
     *   },
     *   capture: false,
     * };
     * const paymentResponse = await this.yookassaService.createPayment(paymentData);
     * console.log(paymentResponse);
     * ```
     */
    async createPayment(paymentData) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments`, paymentData, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
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
    /**
     * Получает список платежей.
     * Этот метод используется для получения списка всех платежей с возможностью пагинации.
     *
     * @param {number} limit - Максимальное количество платежей на страницу.
     * @param {string} from - Начальная дата для фильтрации.
     * @param {string} to - Конечная дата для фильтрации.
     * @returns {Promise<PaymentDetails[]>} Список платежей.
     *
     * @example
     * ```ts
     * const payments = await this.yookassaService.getPayments(10, '2024-01-01', '2024-12-31');
     * console.log(payments);
     * ```
     */
    async getPayments(limit = 10, from = '', to = '') {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}payments`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
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
    /**
     * Получает детали платежа по его ID.
     * Этот метод позволяет получить подробную информацию о платеже, включая его статус, сумму и другие данные.
     *
     * @param {string} paymentId - Уникальный идентификатор платежа, для которого нужно получить детали.
     * @returns {Promise<PaymentDetails>} Промис, который возвращает объект `PaymentDetails` с информацией о платеже.
     *
     * @example
     * ```ts
     * const paymentId = '123456';
     * const paymentDetails = await this.yookassaService.getPaymentDetails(paymentId);
     * console.log(paymentDetails);
     * ```
     */
    async getPaymentDetails(paymentId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}payments/${paymentId}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Выполняет захват платежа.
     * Этот метод используется для захвата средств с карты клиента после того, как был создан платеж.
     * Обычно это делается, когда заказ подтвержден, и продавец готов забрать средства.
     * Возвращает обновленные детали платежа после захвата средств.
     *
     * @param {string} paymentId - Уникальный идентификатор платежа, который нужно захватить.
     * @param {Amount} amount - Сумма, которую необходимо захватить. Если сумма равна нулю, захватится полная сумма платежа.
     * @returns {Promise<PaymentDetails>} Промис, который возвращает объект `PaymentDetails` с информацией о платеже после захвата.
     *
     * @example
     * ```ts
     * const paymentId = '123456';
     * const amount: Amount = {
     *   value: 1000,
     *   currency: 'RUB',
     * };
     * const paymentDetails = await this.yookassaService.capturePayment(paymentId, amount);
     * console.log(paymentDetails);
     * ```
     */
    async capturePayment(paymentId) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const { amount } = await this.getPaymentDetails(paymentId);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments/${paymentId}/capture`, { amount }, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
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
    /**
     * Отменяет платеж.
     * Этот метод используется для отмены платежа.
     *
     * @param {string} paymentId - ID платежа.
     * @returns {Promise<PaymentDetails>} Детали отмененного платежа.
     *
     * @example
     * ```ts
     * const paymentId = '123456';
     * const canceledPaymentDetails = await this.yookassaService.cancelPayment(paymentId);
     * console.log(canceledPaymentDetails);
     * ```
     */
    async cancelPayment(paymentId) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}payments/${paymentId}/cancel`, {}, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
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
    /**
     * Создает возврат средств по указанному платежу.
     * Этот метод отправляет запрос на создание возврата с данными из `refundData`.
     *
     * @param {RefundCreateRequest} refundData - Данные для создания возврата.
     * @returns {Promise<RefundDetails>} Ответ от API с деталями созданного возврата.
     *
     * @example
     * ```ts
     * const refundData: RefundCreateRequest = {
     *   payment_id: '123456',
     *   description: 'Возврат за отмененный заказ',
     * };
     * const refundResponse = await this.yookassaService.createRefund(refundData);
     * console.log(refundResponse);
     * ```
     */
    async createRefund(refundData) {
        const idempotenceKey = (0, uuid_1.v4)();
        try {
            const { amount } = await this.getPaymentDetails(refundData.payment_id);
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.apiUrl}refunds`, {
                payment_id: refundData.payment_id,
                description: refundData.description,
                amount: amount
            }, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
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
    /**
     * Получает список всех возвратов.
     * Возвращает массив объектов с информацией о возвратах.
     *
     * @returns {Promise<RefundDetails[]>} Массив объектов с деталями возвратов.
     *
     * @example
     * ```ts
     * const refunds = await this.yookassaService.getRefunds();
     * console.log(refunds);
     * ```
     */
    async getRefunds() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}refunds`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    /**
     * Получает детали возврата по его ID.
     * Этот метод возвращает подробную информацию о возврате, включая его статус и сумму.
     *
     * @param {string} refundId - Уникальный идентификатор возврата.
     * @returns {Promise<RefundDetails>} Объект с деталями возврата.
     *
     * @example
     * ```ts
     * const refundId = 'refund-id';
     * const refundDetails = await this.yookassaService.getRefundDetails(refundId);
     * console.log(refundDetails);
     * ```
     * @throws {NotFoundException} Если возврат с указанным ID не найден.
     */
    async getRefundDetails(refundId) {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.apiUrl}refunds/${refundId}`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
                }
            }));
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException(error.response.data.description ||
                'Ошибка при выполнении запроса', common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.YookassaService = YookassaService;
exports.YookassaService = YookassaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], YookassaService);
