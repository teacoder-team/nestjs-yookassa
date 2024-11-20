import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'
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

	public async createPayment(
		paymentData: PaymentCreateRequest
	): Promise<PaymentResponse> {
		const response = await firstValueFrom(
			this.httpService.post<PaymentResponse>(
				`${this.apiUrl}payments`,
				paymentData,
				{
					headers: {
						Authorization: `Basic ${Buffer.from(`${this.shopId}:${this.apiKey}`).toString('base64')}`,
						'Content-Type': 'application/json'
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
