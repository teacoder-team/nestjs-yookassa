import type { Payment } from './payment.response'
import type { YookassaMetadata } from '../../../../common/types/metadata.type'

/**
 * Ответ API YooKassa на запрос списка платежей
 */
export interface GetPaymentsResponse<T extends YookassaMetadata = YookassaMetadata> {
	/**
	 * Тип ответа — всегда 'list'
	 */
	type: 'list'

	/**
	 * Список платежей
	 */
	items: Payment<T>[]

	/**
	 * Курсор следующей страницы
	 * Если отсутствует — значит данных больше нет
	 */
	next_cursor?: string
}
