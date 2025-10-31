import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { YOOKASSA_API_URL } from '../yookassa.constants'
import { YookassaOptions, YookassaOptionsSymbol } from '../interfaces'
import {
	CreatePaymentMethodRequest,
	PaymentMethodDetails
} from '../interfaces/payment-method.interfaces'
import { randomUUID } from 'node:crypto'

@Injectable()
export class PaymentMethodService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
	) {}

	public async get(id: string): Promise<PaymentMethodDetails> {
		try {
			const res = await firstValueFrom(
				this.httpService.get<PaymentMethodDetails>(
					`${YOOKASSA_API_URL}/payment_methods/${id}`,
					{
						headers: {
							Authorization: this.getAuthHeader(),
							'Content-Type': 'application/json'
						}
					}
				)
			)
			return res.data
		} catch (err) {
			throw new HttpException(
				err.response?.data?.description ||
					'Ошибка получения способа оплаты',
				HttpStatus.BAD_REQUEST
			)
		}
	}

	public async create(
		data: CreatePaymentMethodRequest
	): Promise<PaymentMethodDetails> {
		const idempotenceKey = randomUUID()

		try {
			const res = await firstValueFrom(
				this.httpService.post<PaymentMethodDetails>(
					`${YOOKASSA_API_URL}/payment_methods`,
					data,
					{
						headers: {
							Authorization: this.getAuthHeader(),
							'Content-Type': 'application/json',
							'Idempotence-Key': idempotenceKey
						}
					}
				)
			)
			return res.data
		} catch (err) {
			throw new HttpException(
				err.response?.data?.description ||
					'Ошибка создания привязки карты',
				HttpStatus.BAD_REQUEST
			)
		}
	}

	private getAuthHeader() {
		return `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
	}
}
