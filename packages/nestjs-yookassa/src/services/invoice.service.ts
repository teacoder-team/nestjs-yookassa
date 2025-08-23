import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import {
	type InvoiceCreateRequest,
	type InvoiceDetails,
	type YookassaOptions,
	YookassaOptionsSymbol
} from '../interfaces'
import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import { v4 as uuidv4 } from 'uuid'
import { YOOKASSA_API_URL } from '../yookassa.constants'

@Injectable()
export class InvoiceService {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly options: YookassaOptions,
		private readonly httpService: HttpService
	) {}

	public async create(
		invoiceData: InvoiceCreateRequest
	): Promise<InvoiceDetails> {
		const idempotenceKey = uuidv4()

		try {
			const response = await firstValueFrom(
				this.httpService.post<InvoiceDetails>(
					`${YOOKASSA_API_URL}invoices`,
					invoiceData,
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

	public async getOne(invoiceId: string): Promise<InvoiceDetails> {
		try {
			const response = await firstValueFrom(
				this.httpService.get<InvoiceDetails>(
					`${YOOKASSA_API_URL}invoices/${invoiceId}`,
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

	private getAuthHeader() {
		return `Basic ${Buffer.from(`${this.options.shopId}:${this.options.apiKey}`).toString('base64')}`
	}
}
