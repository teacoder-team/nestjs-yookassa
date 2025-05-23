import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import {
	type RefundCreateRequest,
	type RefundDetails,
	type YookassaOptions,
	YookassaOptionsSymbol
} from '../interfaces'
import { HttpService } from '@nestjs/axios'
import { PaymentService } from './payment.service'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class RefundService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService,
		private readonly paymentService: PaymentService
	) {}

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
	public async create(
		refundData: RefundCreateRequest
	): Promise<RefundDetails> {
		const idempotenceKey = uuidv4()

		try {
			const { amount } = await this.paymentService.getOne(
				refundData.payment_id
			)

			const response = await firstValueFrom(
				this.httpService.post<RefundDetails>(
					`${YOOKASSA_API_URL}refunds`,
					{
						payment_id: refundData.payment_id,
						amount,
						description: refundData.description
					},
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
	public async getAll(
		limit: number = 10,
		from: string = '',
		to: string = ''
	): Promise<RefundDetails[]> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<RefundDetails[]>(
					`${YOOKASSA_API_URL}refunds`,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
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
	public async getOne(refundId: string): Promise<RefundDetails> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<RefundDetails>(
					`${YOOKASSA_API_URL}refunds/${refundId}`,
					{
						headers: {
							Authorization: `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
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
