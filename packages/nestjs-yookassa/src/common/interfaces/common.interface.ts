import { CurrencyEnum } from '../enums'

/**
 * Тип, представляющий сумму и валюту для платежа.
 */
export interface Amount {
	/**
	 * Значение суммы.
	 */
	value: number
	/**
	 * Валюта суммы, представленная кодом валюты из перечисления `CurrencyEnum`.
	 */
	currency: CurrencyEnum
}
