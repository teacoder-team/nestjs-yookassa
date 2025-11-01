/**
 * Перечисление возможных методов оплаты.
 * Каждый метод оплаты представлен уникальным типом.
 * @enum {string}
 */
export enum PaymentMethodsEnum {
	/**
	 * «Покупки в кредит» от СберБанка
	 */
	SBER_LOAN = 'sber_loan',

	/**
	 * Баланс мобильного телефона
	 */
	MOBILE_BALANCE = 'mobile_balance',

	/**
	 * Банковская карта
	 */
	BANK_CARD = 'bank_card',

	/**
	 * Наличные
	 */
	CASH = 'cash',

	/**
	 * Система быстрых платежей
	 */
	SBP = 'sbp',

	/**
	 * B2B Сбербанк
	 */
	B2B_SBERBANK = 'b2b_sberbank',

	/**
	 * Электронный сертификат
	 */
	ELECTRONIC_CERTIFICATE = 'electronic_certificate',

	/**
	 * YooMoney
	 */
	YOOMONEY = 'yoo_money',

	/**
	 * Сбербанк
	 */
	SBERBANK = 'sberbank',

	/**
	 * Альфа-Банк
	 */
	ALFABANK = 'alfabank',

	/**
	 * Тинькофф Банк
	 */
	T_BANK = 'tinkoff_bank'
}
