import type { Amount } from './common.interface'

/**
 * Перечисление кодов НДС (налога на добавленную стоимость).
 * Эти коды соответствуют различным ставкам НДС.
 * @enum {number}
 */
export enum VatCodesEnum {
	/**
	 * Без НДС.
	 */
	'ndsNone' = 1,

	/**
	 * НДС 0%.
	 */
	'nds0' = 2,

	/**
	 * НДС 10%.
	 */
	'nds10' = 3,

	/**
	 * НДС 20%.
	 */
	'nds20' = 4,

	/**
	 * НДС 10/110 (для некоторых товаров).
	 */
	'nds10/110' = 5,

	/**
	 * НДС 20/120 (для некоторых товаров).
	 */
	'nds20/120' = 6
}

/**
 * Перечисление кодов систем налогообложения.
 * Каждая система налогообложения имеет свой код.
 * @enum {number}
 */
export enum TaxSystemCodesEnum {
	/**
	 * Общая система налогообложения.
	 */
	'OSN' = 1,

	/**
	 * Упрощенная система налогообложения 6%.
	 */
	'USN6' = 2,

	/**
	 * Упрощенная система налогообложения 15%.
	 */
	'USN15' = 3,

	/**
	 * Единый налог на вмененный доход.
	 */
	'ENVD' = 4,

	/**
	 * Единый сельскохозяйственный налог.
	 */
	'ESN' = 5,

	/**
	 * Патентная система налогообложения.
	 */
	'PSN' = 6
}

/**
 * Перечисление состояний регистрации чека.
 * @enum {string}
 */
export enum ReceiptRegistrationEnum {
	/**
	 * Ожидает регистрации
	 */
	pending = 'pending',

	/**
	 * Успешно зарегистрирован
	 */
	succeeded = 'succeeded',

	/**
	 * Регистрация отменена
	 */
	canceled = 'canceled'
}

export interface ReceiptItem {
	description: string
	quantity: number
	amount: Amount
	vat_code: VatCodesEnum
	payment_mode: string // Вынести в enum
	payment_subject: string // Вынести в enum
	country_of_origin_code?: string
}

export interface Settlement {
	type: 'prepayment' | 'full_payment' | 'advance' | 'credit'
	amount: Amount
}

export interface ReceiptDetails {
	id: string
	type: 'payment' | 'refund'
	payment_id?: string
	refund_id?: string
	status: ReceiptRegistrationEnum
	fiscal_document_number?: string
	fiscal_storage_number?: string
	fiscal_attribute?: string
	registered_at?: string
	fiscal_provider_id?: string
	tax_system_code?: TaxSystemCodesEnum
	items: ReceiptItem[]
	settlements?: Settlement[]
}
