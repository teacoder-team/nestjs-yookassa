/**
 * Перечисление состояний регистрации чека.
 * @enum {string}
 */
export enum ReceiptRegistrationEnum {
	/**
	 * Ожидает регистрации
	 */
	PENDING = 'pending',

	/**
	 * Успешно зарегистрирован
	 */
	SUCCEEDED = 'succeeded',

	/**
	 * Регистрация отменена
	 */
	CANCELED = 'canceled'
}
