import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'

export const YookassaOptionsSymbol = Symbol('YookassaOptionsSymbol')

/**
 * Тип, представляющий параметры для настройки YooKassa.
 */
export type YookassaModuleOptions = {
	/**
	 * Идентификатор магазина в YooKassa.
	 */
	shopId: string
	/**
	 * Ключ API для аутентификации в YooKassa.
	 */
	apiKey: string

	/**
	 * Настройки HTTP-прокси для отправки запросов.
	 *
	 * Используется в случаях, когда запросы к YooKassa должны идти
	 * через российский IP — например, если сервер находится за границей.
	 *
	 * Пример простого подключения:
	 * {
	 *   host: '192.168.1.10',
	 *   port: 8888,
	 *   protocol: 'http'
	 * }
	 */
	proxy?: {
		/**
		 * Хост или IPv4-адрес прокси-сервера.
		 * Например: "91.218.114.206"
		 */
		host: string

		/**
		 * Порт, на котором работает прокси.
		 * Для tinyproxy обычно 8888.
		 */
		port: number

		/**
		 * Протокол для подключения к прокси.
		 * Почти всегда "http", т.к. tinyproxy не использует HTTPS.
		 */
		protocol?: 'http' | 'https'

		/**
		 * Данные для авторизации на прокси (необязательно).
		 *
		 * Используется ТОЛЬКО если прокси защищён логином и паролем.
		 * В tinyproxy по умолчанию не нужно.
		 *
		 * Пример:
		 * auth: { username: "user", password: "pass" }
		 */
		auth?: {
			username: string
			password: string
		}
	}
}

/**
 * Тип для асинхронной настройки YooKassa.
 */
export type YookassaModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<YookassaModuleOptions>, 'useFactory' | 'inject'>
