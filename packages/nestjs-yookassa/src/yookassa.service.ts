import { Injectable } from '@nestjs/common'
import { PaymentService, RefundService } from './services'
import { PaymentCreateRequest, RefundCreateRequest } from './interfaces'

@Injectable()
export class YookassaService {
	public constructor(
		private readonly paymentService: PaymentService,
		private readonly refundService: RefundService
	) {}

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
	public async createPayment(paymentData: PaymentCreateRequest) {
		return await this.paymentService.create(paymentData)
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
	 * const payments = await this.yookassaService.getPayments(10, '2025-01-01', '2025-01-17');
	 * console.log(payments);
	 * ```
	 */
	public async getPayments(limit?: number, from?: string, to?: string) {
		return await this.paymentService.getAll(limit, from, to)
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
	public async getPaymentDetails(paymentId: string) {
		return await this.paymentService.getOne(paymentId)
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
	public async capturePayment(paymentId: string) {
		return await this.paymentService.capture(paymentId)
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
	public async cancelPayment(paymentId: string) {
		return await this.paymentService.cancel(paymentId)
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
	public async createRefund(refundData: RefundCreateRequest) {
		return await this.refundService.create(refundData)
	}
	/**
	 * Получает список всех возвратов.
	 * Возвращает массив объектов с информацией о возвратах.
	 *
	 * @param {number} limit - Максимальное количество платежей на страницу.
	 * @param {string} from - Начальная дата для фильтрации.
	 * @param {string} to - Конечная дата для фильтрации.
	 * @returns {Promise<RefundDetails[]>} Массив объектов с деталями возвратов.
	 *
	 * @example
	 * ```ts
	 * const refunds = await this.yookassaService.getRefunds(10, '2025-01-01', '2025-01-17');
	 * console.log(refunds);
	 * ```
	 */
	public async getRefunds(limit?: number, from?: string, to?: string) {
		return await this.refundService.getAll(limit, from, to)
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
	public async getRefundDetails(refundId: string) {
		return await this.refundService.getOne(refundId)
	}
}
