import type { Refund } from './refund.response'

/**
 * Ответ API YooKassa — список возвратов
 */
export interface GetRefundsResponse {
	/**
	 * Тип ответа — всегда 'list'
	 */
	type: 'list'

	/**
	 * Список возвратов
	 */
	items: Refund[]

	/**
	 * Курсор следующей страницы
	 * Если отсутствует — значит это последняя страница
	 */
	next_cursor?: string
}
