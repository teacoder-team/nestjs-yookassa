import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import {
	type YookassaAsyncOptions,
	type YookassaOptions,
	YookassaOptionsSymbol
} from './interfaces'
import { YookassaService } from './yookassa.service'
import { PaymentService } from './services/payment.service'
import { RefundService } from './services/refund.service'
import { InvoiceService, PaymentMethodService } from './services'

@Global()
@Module({})
export class YookassaModule {
	/**
	 * Метод для регистрации модуля с синхронными параметрами.
	 * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
	 * @param {YookassaOptions} options - Настройки для конфигурации YooKassa.
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
	public static forRoot(options: YookassaOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [HttpModule],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useValue: options
				},
				PaymentService,
				PaymentMethodService,
				InvoiceService,
				RefundService,
				YookassaService
			],
			exports: [YookassaService],
			global: true
		}
	}

	/**
	 * Метод для регистрации модуля с асинхронной конфигурацией.
	 * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
	 * @param {YookassaAsyncOptions} options - Асинхронные параметры для конфигурации YooKassa.
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
	public static forRootAsync(options: YookassaAsyncOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				PaymentService,
				PaymentMethodService,
				InvoiceService,
				RefundService,
				YookassaService
			],
			exports: [YookassaService],
			global: true
		}
	}
}
