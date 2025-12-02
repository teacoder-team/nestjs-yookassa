import type { FactoryProvider, ModuleMetadata } from '@nestjs/common'
import type { HttpsProxyAgent } from 'https-proxy-agent'

export const YookassaOptionsSymbol = Symbol('YookassaOptionsSymbol')

/**
 * Настройки модуля YooKassa.
 */
export type YookassaModuleOptions = {
	/**
	 * Идентификатор магазина YooKassa.
	 */
	shopId: string

	/**
	 * Секретный ключ API.
	 */
	apiKey: string

	/**
	 * Агент для отправки HTTPS-запросов через прокси.
	 *
	 * Обычно HttpsProxyAgent, созданный так:
	 *
	 *   new HttpsProxyAgent("http://IP:PORT")
	 *
	 * Если передан agent — axios прекратит использовать встроенный proxy-режим,
	 * и весь трафик к YooKassa *гарантированно пойдёт через прокси*.
	 */
	agent?: HttpsProxyAgent<any>
}

/**
 * Асинхронная конфигурация модуля.
 */
export type YookassaModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> &
	Pick<FactoryProvider<YookassaModuleOptions>, 'useFactory' | 'inject'>
