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
import { YOOKASSA_API_URL } from '../yookassa.constants'

@Injectable()
export class PaymentService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
	) {}

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
