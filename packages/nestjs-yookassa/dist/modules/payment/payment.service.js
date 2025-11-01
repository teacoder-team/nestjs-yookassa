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
exports.PaymentService = void 0;
const common_1 = require("@nestjs/common");
const yookassa_http_client_1 = require("../../core/http/yookassa.http-client");
let PaymentService = class PaymentService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Создает платеж через YooKassa.
     * Этот метод отправляет запрос на создание нового платежа с данными из `paymentData`.
     * Возвращает информацию о созданном платеже.
     *
     * @param {CreatePaymentRequest} data - Данные для создания платежа.
     * @returns {Promise<CreatePaymentResponse>} Ответ от API с деталями платежа.
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
     * const paymentResponse = await this.yookassaService.payments.create(paymentData);
     * console.log(paymentResponse);
     * ```
     */
    async create(data) {
        return this.http.post('/payments', data);
    }
    /**
     * Получает список платежей с возможностью фильтрации и пагинации.
     *
     * Метод позволяет получить список платежей из YooKassa,
     * используя фильтры по времени создания, времени подтверждения,
     * способу оплаты, статусу платежа, а также курсор для постраничной выборки.
     *
     * @param {GetPaymentsRequest} params — Объект параметров фильтрации и пагинации.
     * @returns {Promise<GetPaymentsResponse>} Объект, содержащий список платежей и `next_cursor` для получения следующей страницы.
     *
     * @example Получение списка первых 20 платежей
     * ```ts
     * const payments = await this.yookassaService.payments.getAll({ limit: 20 });
     * console.log(payments.items);
     * ```
     *
     * @example Фильтрация по периоду создания
     * ```ts
     * const payments = await this.yookassaService.payments.getAll({
     *   'created_at.gte': '2025-01-01T00:00:00.000Z',
     *   'created_at.lte': '2025-01-31T23:59:59.000Z'
     * });
     * ```
     *
     * @example Пагинация по курсору
     * ```ts
     * const firstPage = await this.yookassaService.payments.getAll({ limit: 10 });
     * const nextPage = await this.yookassaService.payments.getAll({
     *   cursor: firstPage.next_cursor
     * });
     * ```
     *
     * @example Фильтрация по статусу и способу оплаты
     * ```ts
     * const payments = await this.yookassaService.payments.getAll({
     *   status: PaymentStatusEnum.SUCCEEDED,
     *   payment_method: PaymentMethodsEnum.BANK_CARD
     * });
     * ```
     */
    async getAll(params = {}) {
        return this.http.get('/payments', params);
    }
    /**
     * Получает детали платежа по его ID.
     * Этот метод позволяет получить подробную информацию о платеже, включая его статус, сумму и другие данные.
     *
     * @param {string} id - Уникальный идентификатор платежа, для которого нужно получить детали.
     * @returns {Promise<Payment>} Промис, который возвращает объект `PaymentDetails` с информацией о платеже.
     *
     * @example
     * ```ts
     * const paymentId = 'payment-id';
     * const payment = await this.yookassaService.payments.getById(paymentId);
     * console.log(payment);
     * ```
     */
    async getById(id) {
        return this.http.get(`/payments/${id}`);
    }
    /**
     * Выполняет захват платежа.
     * Этот метод используется для захвата средств с карты клиента после того, как был создан платеж.
     * Обычно это делается, когда заказ подтвержден, и продавец готов забрать средства.
     * Возвращает обновленные детали платежа после захвата средств.
     *
     * @param {string} id - Уникальный идентификатор платежа, который нужно захватить.
     * @returns {Promise<Payment>} Промис, который возвращает объект `PaymentDetails` с информацией о платеже после захвата.
     *
     * @example
     * ```ts
     * const paymentId = '123456';
     * const paymentDetails = await this.yookassaService.payments.capture(paymentId);
     * console.log(paymentDetails);
     * ```
     */
    async capture(id) {
        return this.http.post(`/payments/${id}/capture`);
    }
    /**
     * Отменяет платеж.
     * Этот метод используется для отмены платежа.
     *
     * @param {string} id - ID платежа.
     * @returns {Promise<Payment>} Детали отмененного платежа.
     *
     * @example
     * ```ts
     * const paymentId = '123456';
     * const canceledPaymentDetails = await this.yookassaService.payments.cancel(paymentId);
     * console.log(canceledPaymentDetails);
     * ```
     */
    async cancel(id) {
        return this.http.post(`/payments/${id}/cancel`);
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [yookassa_http_client_1.YookassaHttpClient])
], PaymentService);
