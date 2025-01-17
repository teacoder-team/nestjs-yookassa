import { HttpService } from '@nestjs/axios'
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import {
	YookassaOptionsSymbol,
	type Amount,
	type PaymentCreateRequest,
	type PaymentDetails,
	type YookassaOptions
} from './interfaces'
import { RefundDetails } from './interfaces/refund-details.interface'
import { RefundCreateRequest } from './interfaces/refund-request.interface'
import { DEFAULT_URL } from './yookassa.constants'

@Injectable()
export class YookassaService {
	private readonly shopId: string
	private readonly apiKey: string
	private readonly apiUrl: string

	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
	) {
		this.shopId = options.shopId
		this.apiKey = options.apiKey
		this.apiUrl = DEFAULT_URL
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
	public async createPayment(
		paymentData: PaymentCreateRequest
	): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${this.apiUrl}payments`,
					paymentData,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(
								`${this.shopId}:${this.apiKey}`
							).toString('base64')}`,
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)
			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async getPayments(
		limit: number = 10,
		from: string = '',
		to: string = ''
	): Promise<PaymentDetails[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<PaymentDetails[]>(
					`${this.apiUrl}payments`,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
						},
						params: {
							limit,
							from,
							to
						}
					}
				)
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async getPaymentDetails(paymentId: string): Promise<PaymentDetails> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<PaymentDetails>(
					`${this.apiUrl}payments/${paymentId}`,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
						}
					}
				)
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async capturePayment(paymentId: string): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const { amount } = await this.getPaymentDetails(paymentId)

			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${this.apiUrl}payments/${paymentId}/capture`,
					{ amount },
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async cancelPayment(paymentId: string): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${this.apiUrl}payments/${paymentId}/cancel`,
					{},
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)
			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	 *   amount: {
	 *     value: 500,
	 *     currency: 'RUB',
	 *   },
	 *   description: 'Возврат за отмененный заказ',
	 * };
	 * const refundResponse = await this.yookassaService.createRefund(refundData);
	 * console.log(refundResponse);
	 * ```
	 */
	public async createRefund(
		refundData: RefundCreateRequest
	): Promise<RefundDetails> {
		const idempotenceKey = uuidv4()

		try {
			const { amount } = await this.getPaymentDetails(
				refundData.payment_id
			)

			const response = await firstValueFrom(
				this.httpService.post<RefundDetails>(
					`${this.apiUrl}refunds`,
					{ refundData, amount },
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async getRefunds(): Promise<RefundDetails[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<RefundDetails[]>(`${this.apiUrl}refunds`, {
					headers: {
						Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
					}
				})
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
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
	public async getRefundDetails(refundId: string): Promise<RefundDetails> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<RefundDetails>(
					`${this.apiUrl}refunds/${refundId}`,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`
						}
					}
				)
			)

			return response.data
		} catch (error) {
			throw new HttpException(
				error.response.data.description ||
					'Ошибка при выполнении запроса',
				HttpStatus.BAD_REQUEST
			)
		}
	}
}
