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
import { randomUUID } from 'node:crypto'
import { YOOKASSA_API_URL } from '../yookassa.constants'

@Injectable()
export class RefundService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService,
		private readonly paymentService: PaymentService
	) {}

	public async create(
		refundData: RefundCreateRequest
	): Promise<RefundDetails> {
		const idempotenceKey = randomUUID()

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
