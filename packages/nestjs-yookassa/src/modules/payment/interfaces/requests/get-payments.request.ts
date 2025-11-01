import type { PaymentMethodsEnum, PaymentStatusEnum } from '../../enums'

/**
 * Параметры для получения списка платежей.
 * Поля соответствуют фильтрам ЮKassa.
 */
export interface GetPaymentsRequest {
	/**
	 * created_at >= (включительно)
	 * ISO 8601
	 */
	'created_at.gte'?: string

	/**
	 * created_at > (строго после)
	 * ISO 8601
	 */
	'created_at.gt'?: string

	/**
	 * created_at <= (включительно)
	 * ISO 8601
	 */
	'created_at.lte'?: string

	/**
	 * created_at < (строго до)
	 * ISO 8601
	 */
	'created_at.lt'?: string

	/**
	 * captured_at >= (включительно)
	 * ISO 8601
	 */
	'captured_at.gte'?: string

	/**
	 * captured_at > (строго после)
	 * ISO 8601
	 */
	'captured_at.gt'?: string

	/**
	 * captured_at <= (включительно)
	 * ISO 8601
	 */
	'captured_at.lte'?: string

	/**
	 * captured_at < (строго до)
	 * ISO 8601
	 */
	'captured_at.lt'?: string

	/**
	 * Фильтр по типу метода оплаты
	 * Например: bank_card
	 */
	payment_method?: PaymentMethodsEnum | string

	/**
	 * Фильтр по статусу платежа
	 * Например: succeeded
	 */
	status?: PaymentStatusEnum | string

	/**
	 * Количество объектов на странице (1–100)
	 * @default 10
	 */
	limit?: number

	/**
	 * Курсор для пагинации
	 * Передаётся значение `next_cursor` из предыдущего ответа
	 */
	cursor?: string
}
