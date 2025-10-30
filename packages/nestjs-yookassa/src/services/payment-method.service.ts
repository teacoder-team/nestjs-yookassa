import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { YOOKASSA_API_URL } from '../yookassa.constants'
import { YookassaOptions, YookassaOptionsSymbol } from '../interfaces'
import {
	CreatePaymentMethodRequest,
	PaymentMethodDetails
} from '../interfaces/payment-method.interfaces'

@Injectable()
export class PaymentMethodService {
	constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
	) {}

	public async create(
		data: CreatePaymentMethodRequest
	): Promise<PaymentMethodDetails> {
		const idempotenceKey = uuidv4()

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
