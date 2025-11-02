import { HttpModule, HttpService } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'

import { YookassaService } from './yookassa.service'
import { PaymentModule } from './modules/payment/payment.module'
import { RefundModule } from './modules/refund/refund.module'
import { YookassaHttpClient } from './core/http/yookassa.http-client'
import {
	type YookassaModuleAsyncOptions,
	type YookassaModuleOptions,
	YookassaOptionsSymbol
} from './common/interfaces'
import { InvoiceModule } from './modules/invoice/invoice.module'
import { PaymentMethodModule } from './modules/payment-method/payment-method.module'

@Global()
@Module({})
export class YookassaModule {
	/**
	 * Метод для регистрации модуля с синхронными параметрами.
	 * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
	 * @param {YookassaModuleOptions} options - Настройки для конфигурации YooKassa.
	 * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
	 *
	 * @example
	 * ```ts
	 * YookassaModule.forRoot({
	 *   shopId: 'your_shop_id',
	 *   apiKey: 'your_api_key',
	 * });
	 * ```
	 */
	public static forRoot(options: YookassaModuleOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [
				HttpModule,
				PaymentModule,
				RefundModule,
				InvoiceModule,
				PaymentMethodModule
			],
			providers: [
				{ provide: YookassaOptionsSymbol, useValue: options },

				{
					provide: YookassaHttpClient,
					useFactory: (
						cfg: YookassaModuleOptions,
						http: HttpService
					) => new YookassaHttpClient(cfg, http),
					inject: [YookassaOptionsSymbol, HttpService]
				},

				YookassaService
			],
			exports: [YookassaService, YookassaHttpClient],
			global: true
		}
	}

	/**
	 * Метод для регистрации модуля с асинхронной конфигурацией.
	 * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
	 * @param {YookassaModuleAsyncOptions} options - Асинхронные параметры для конфигурации YooKassa.
	 * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
	 *
	 * @example
	 * ```ts
	 * YookassaModule.forRootAsync({
	 *   imports: [ConfigModule],
	 *	  useFactory: async (configService: ConfigService) => ({
	 *		 shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
	 *		 apiKey: configService.getOrThrow('YOOKASSA_API_KEY')
	 *	  }),
	 *	  inject: [ConfigService]
	 * });
	 * ```
	 */
	public static forRootAsync(
		options: YookassaModuleAsyncOptions
	): DynamicModule {
		return {
			module: YookassaModule,
			imports: [
				HttpModule,
				...(options.imports || []),
				PaymentModule,
				RefundModule,
				InvoiceModule,
				PaymentMethodModule
			],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},

				{
					provide: YookassaHttpClient,
					useFactory: (
						cfg: YookassaModuleOptions,
						http: HttpService
					) => new YookassaHttpClient(cfg, http),
					inject: [YookassaOptionsSymbol, HttpService]
				},

				YookassaService
			],
			exports: [YookassaService, YookassaHttpClient],
			global: true
		}
	}
}
