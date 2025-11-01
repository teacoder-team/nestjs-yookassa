import { YookassaHttpClient } from '../../core/http/yookassa.http-client';
import type { CreateRefundResponse, Refund, CreateRefundRequest, GetRefundsRequest, GetRefundsResponse } from './interfaces';
export declare class RefundService {
    private readonly http;
    constructor(http: YookassaHttpClient);
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
    create(data: CreateRefundRequest): Promise<CreateRefundResponse>;
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
    getAll(params?: GetRefundsRequest): Promise<GetRefundsResponse>;
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
    getById(id: string): Promise<Refund>;
}
