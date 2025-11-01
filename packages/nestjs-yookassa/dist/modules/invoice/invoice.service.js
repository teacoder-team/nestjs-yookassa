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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const yookassa_http_client_1 = require("../../core/http/yookassa.http-client");
let InvoiceService = class InvoiceService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Создает счет.
     * Этот метод отправляет запрос на создание нового счета с данными из `invoiceData`.
     * Возвращает информацию о созданном счете.
     *
     * @param {CreateInvoiceRequest} data - Данные для создания счета.
     * @returns {Promise<CreateInvoiceResponse>} Ответ от API с деталями созданного счета.
     *
     * @example
     * ```ts
     * const invoiceData: InvoiceCreateRequest = {
     *   amount: { value: '1000.00', currency: 'RUB' },
     *   gateway_id: 'subaccount-id',
     *   cart: [
     *     { description: 'Товар 1', price: { value: '1000.00', currency: 'RUB' }, quantity: 1 }
     *   ],
     *   expires_at: '2025-08-30T10:00:00.000Z'
     * };
     * const invoice = await this.yookassaService.invoices.create(invoiceData);
     * console.log(invoice);
     * ```
     */
    async create(data) {
        return this.http.post('/invoices', data);
    }
    /**
     * Получает детали счета по его ID.
     * Этот метод позволяет получить подробную информацию о счете, включая статус, корзину и платежи.
     *
     * @param {string} id - Уникальный идентификатор счета.
     * @returns {Promise<Invoice>} Объект с деталями счета.
     *
     * @example
     * ```ts
     * const invoiceId = 'invoice-id';
     * const invoiceDetails = await this.yookassaService.invoices.getById(invoiceId);
     * console.log(invoiceDetails);
     * ```
     */
    async getById(id) {
        return this.http.get(`/invoices/${id}`);
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [yookassa_http_client_1.YookassaHttpClient])
], InvoiceService);
