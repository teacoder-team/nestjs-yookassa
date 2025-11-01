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
exports.RefundService = void 0;
const common_1 = require("@nestjs/common");
const yookassa_http_client_1 = require("../../core/http/yookassa.http-client");
let RefundService = class RefundService {
    constructor(http) {
        this.http = http;
    }
    /**
     * Создает возврат средств по указанному платежу.
     * Этот метод отправляет запрос на создание возврата с данными из `refundData`.
     *
     * @param {CreateRefundRequest} data - Данные для создания возврата.
     * @returns {Promise<CreateRefundResponse>} Ответ от API с деталями созданного возврата.
     *
     * @example
     * ```ts
     * const refundData: CreateRefundRequest = {
     *   payment_id: '123456',
     *   description: 'Возврат за отмененный заказ',
     * };
     * const refundResponse = await this.yookassaService.refunds.create(refundData);
     * console.log(refundResponse);
     * ```
     */
    async create(data) {
        return this.http.post('/refunds', data);
    }
    /**
     * Получает список возвратов с возможностью фильтрации и пагинации.
     *
     * Метод позволяет получить возвраты по платежам из YooKassa,
     * используя фильтры по дате создания, ID платежа, статусу,
     * а также курсор для постраничной выборки.
     *
     * @param {GetRefundsRequest} params — Объект параметров фильтрации и пагинации возвратов.
     * @returns {Promise<GetRefundsResponse>} Объект со списком возвратов и `next_cursor` для продолжения выборки.
     *
     * @example Получить первые 20 возвратов
     * ```ts
     * const refunds = await this.yookassaService.refunds.getAll({ limit: 20 });
     * console.log(refunds.items);
     * ```
     *
     * @example Фильтрация по периоду
     * ```ts
     * const refunds = await this.yookassaService.refunds.getAll({
     *   'created_at.gte': '2025-01-01T00:00:00.000Z',
     *   'created_at.lte': '2025-01-31T23:59:59.000Z'
     * });
     * ```
     *
     * @example Получить возвраты конкретного платежа
     * ```ts
     * const refunds = await this.yookassaService.refunds.getAll({
     *   payment_id: '2aa99c13-000f-5000-9000-19f66f41b6d1'
     * });
     * ```
     *
     * @example Фильтрация по статусу
     * ```ts
     * const refunds = await this.yookassaService.refunds.getAll({
     *   status: RefundStatusEnum.succeeded
     * });
     * ```
     *
     * @example Пагинация через cursor
     * ```ts
     * const firstPage = await this.yookassaService.refunds.getAll({ limit: 10 });
     * const nextPage = await this.yookassaService.refunds.getAll({
     *   cursor: firstPage.next_cursor
     * });
     * ```
     */
    async getAll(params = {}) {
        return this.http.get('/refunds', params);
    }
    /**
     * Получает детали возврата по его ID.
     * Этот метод возвращает подробную информацию о возврате, включая его статус и сумму.
     *
     * @param {string} id - Уникальный идентификатор возврата.
     * @returns {Promise<Refund>} Объект с деталями возврата.
     *
     * @example
     * ```ts
     * const refundId = 'refund-id';
     * const refundDetails = await this.yookassaService.refunds.getById(refundId);
     * console.log(refundDetails);
     * ```
     */
    async getById(id) {
        return this.http.get(`/refunds/${id}`);
    }
};
exports.RefundService = RefundService;
exports.RefundService = RefundService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [yookassa_http_client_1.YookassaHttpClient])
], RefundService);
