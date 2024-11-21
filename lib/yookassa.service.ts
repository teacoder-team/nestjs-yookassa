import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { PaymentDetails } from './interfaces/payment-details.interface'
import { PaymentCreateRequest } from './interfaces/payment-request.interface'
import {
	YookassaOptions,
	YookassaOptionsSymbol
} from './interfaces/yookassa-options.interface'
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
	 * @returns {Promise<PaymentResponse>} Ответ от API с деталями платежа.
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
	 * const paymentResponse = await yookassaService.createPayment(paymentData);
	 * console.log(paymentResponse);
	 * ```
	 */
	public async createPayment(
		paymentData: PaymentCreateRequest
	): Promise<PaymentResponse> {
		const idempotenceKey = uuidv4()

		const response = await firstValueFrom(
			this.httpService.post<PaymentResponse>(
				`${this.apiUrl}payments`,
				paymentData,
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
	}

	public async getPaymentDetails(paymentId: string): Promise<PaymentDetails> {
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
	}
}
