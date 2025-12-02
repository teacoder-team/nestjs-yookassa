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
import { request, Agent, ProxyAgent } from 'undici'

@Injectable()
export class YookassaHttpClient {
	private readonly dispatcher: any

	public constructor(
		@Inject(YookassaOptionsSymbol)
		private readonly config: YookassaModuleOptions,
		private readonly httpService: HttpService
	) {
		if (this.config.agent) {
			const proxyUrl = this.extractProxyFromAgent()

			this.dispatcher = new ProxyAgent(proxyUrl)

			console.log('[YooKassa] ProxyAgent enabled:', proxyUrl)
		} else {
			this.dispatcher = undefined
		}
	}

	public async request<T = any>(options: {
		method: string
		url: string
		data?: any
		params?: any
	}): Promise<T> {
		const url = this.buildUrl(options.url, options.params)

		try {
			const res = await request(url, {
				method: options.method,
				dispatcher: this.dispatcher,
				headersTimeout: 15000,
				bodyTimeout: 15000,
				headers: {
					'Content-Type': 'application/json',
					'Idempotence-Key': randomUUID(),
					Authorization: this.buildAuthHeader()
				},
				body: options.data ? JSON.stringify(options.data) : undefined
			})

			if (res.statusCode >= 400) {
				const text = await res.body.text()
				throw new YookassaError('yookassa_error', text, text)
			}

			return (await res.body.json()) as T
		} catch (error: any) {
			throw new YookassaError(
				error?.type || 'yookassa_error',
				error?.message || 'Unknown Yookassa error',
				error
			)
		}
	}

	public get<T>(url: string, params?: any) {
		return this.request<T>({ method: 'GET', url, params })
	}

	public post<T>(url: string, data?: any) {
		return this.request<T>({ method: 'POST', url, data })
	}

	private buildAuthHeader() {
		const creds = Buffer.from(
			`${this.config.shopId}:${this.config.apiKey}`
		).toString('base64')

		return `Basic ${creds}`
	}

	private buildUrl(url: string, params?: any): string {
		let full = `${YOOKASSA_API_URL}${url}`

		if (params && typeof params === 'object') {
			const qp = new URLSearchParams(params)
			full += `?${qp.toString()}`
		}

		return full
	}

	private extractProxyFromAgent(): string {
		const proxy = this.config.agent?.proxy?.href

		if (!proxy) {
			throw new Error(
				'[YooKassa] Unable to extract proxy URL from HttpsProxyAgent'
			)
		}

		return proxy
	}
}
