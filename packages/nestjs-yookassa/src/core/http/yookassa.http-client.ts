import { HttpService } from '@nestjs/axios'
import { firstValueFrom } from 'rxjs'
import type { AxiosRequestConfig } from 'axios'
import { YookassaError } from './yookassa.error'
import { YOOKASSA_API_URL } from '../config/yookassa.constants'
import { randomUUID } from 'crypto'
import { Inject, Injectable } from '@nestjs/common'
import {
	type YookassaModuleOptions,
	YookassaOptionsSymbol
} from '../../common/interfaces'

@Injectable()
export class YookassaHttpClient {
	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly config: YookassaModuleOptions,
		private readonly httpService: HttpService
	) {
		const client = this.httpService.axiosRef

		client.defaults.baseURL = YOOKASSA_API_URL
		client.defaults.timeout = 15000

		client.defaults.auth = {
			username: this.config.shopId,
			password: this.config.apiKey
		}

		client.defaults.headers.common['Content-Type'] = 'application/json'

		client.defaults.proxy = false

		if (this.config.agent) {
			client.defaults.httpAgent = this.config.agent
			client.defaults.httpsAgent = this.config.agent

			console.log(`[YooKassa] Proxy agent enabled`)
		}
	}

	public async request<T = any>(options: AxiosRequestConfig): Promise<T> {
		try {
			options.headers = {
				...options.headers,
				'Idempotence-Key': randomUUID()
			}

			if (this.config.agent) {
				options.httpAgent = this.config.agent
				options.httpsAgent = this.config.agent
				options.proxy = false
			}

			const res = await firstValueFrom(this.httpService.request(options))

			return res.data
		} catch (error: any) {
			throw new YookassaError(
				error?.response?.data?.type || 'yookassa_error',
				error?.response?.data?.description || error.message,
				error?.response?.data
			)
		}
	}

	public get<T>(url: string, params?: any) {
		return this.request<T>({ method: 'GET', url, params })
	}

	public post<T>(url: string, data?: any) {
		return this.request<T>({ method: 'POST', url, data })
	}
}
