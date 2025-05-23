import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import {
	type PaymentCreateRequest,
	type PaymentDetails,
	type YookassaOptions,
	YookassaOptionsSymbol
} from '../interfaces'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class PaymentService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
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
	public async create(
		paymentData: PaymentCreateRequest
	): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${YOOKASSA_API_URL}payments`,
					paymentData,
					{
						headers: {
							Authorization: this.getAuthHeader(),
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)
			return response.data
		} catch (error) {
			throw new HttpException(
				error.response?.data?.description ||
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
	 * const payments = await this.yookassaService.getPayments(10, '2025-01-01', '2025-01-17');
	 * console.log(payments);
	 * ```
	 */
	public async getAll(
		limit: number = 10,
		from: string = '',
		to: string = ''
	): Promise<PaymentDetails[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<PaymentDetails[]>(
					`${YOOKASSA_API_URL}payments`,
					{
						headers: {
							Authorization: this.getAuthHeader()
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
	public async getOne(paymentId: string): Promise<PaymentDetails> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<PaymentDetails>(
					`${YOOKASSA_API_URL}payments/${paymentId}`,
					{
						headers: {
							Authorization: this.getAuthHeader()
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
	public async capture(paymentId: string): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const { amount } = await this.getOne(paymentId)

			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${YOOKASSA_API_URL}payments/${paymentId}/capture`,
					{ amount },
					{
						headers: {
							Authorization: this.getAuthHeader(),
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
	public async cancel(paymentId: string): Promise<PaymentDetails> {
		const idempotenceKey = uuidv4()

		try {
			const response = await firstValueFrom(
				this.httpService.post<PaymentDetails>(
					`${YOOKASSA_API_URL}payments/${paymentId}/cancel`,
					{},
					{
						headers: {
							Authorization: this.getAuthHeader(),
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

	private getAuthHeader() {
		return `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
	}
}
