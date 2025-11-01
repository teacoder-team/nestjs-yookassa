/**
 * Перечисление возможных статусов платежа.
 * @enum {string}
 */
export enum PaymentStatusEnum {
	/**
	 * Платеж ожидает обработки.
	 */
	PENDING = 'pending',

	/**
	 * Платеж ожидает захвата.
	 */
	WAITING_FOR_CAPTURE = 'waiting_for_capture',

	/**
	 * Платеж успешно завершен.
	 */
	SUCCEEDED = 'succeeded',

	/**
	 * Платеж отменен.
	 */
	CANCELED = 'canceled'
}
