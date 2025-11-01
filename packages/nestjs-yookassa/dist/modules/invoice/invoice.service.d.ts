import type { CreateInvoiceRequest, CreateInvoiceResponse, Invoice } from './interfaces';
import { YookassaHttpClient } from '../../core/http/yookassa.http-client';
export declare class InvoiceService {
    private readonly http;
    constructor(http: YookassaHttpClient);
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
    create(data: CreateInvoiceRequest): Promise<CreateInvoiceResponse>;
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
    getById(id: string): Promise<Invoice>;
}
