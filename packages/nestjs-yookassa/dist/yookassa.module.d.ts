import { type DynamicModule } from '@nestjs/common';
import { type YookassaAsyncOptions, type YookassaOptions } from './interfaces/yookassa-options.interface';
export declare class YookassaModule {
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
    static forRoot(options: YookassaOptions): DynamicModule;
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
    static forRootAsync(options: YookassaAsyncOptions): DynamicModule;
}
