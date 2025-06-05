import type { Amount } from './common.interface'
import type { ConfirmationRequest } from './confirmation.interface'
import type { PaymentMethod } from './payment-method.interface'

/**
 * Тип, представляющий запрос на создание платежа.
 */
export interface PaymentCreateRequest {
	/**
	 * Сумма платежа.
	 */
	amount: Amount

	/**
	 * Описание платежа.
	 * Необязательное поле.
	 */
	description?: string

	/**
	 * Чек, который будет прикреплен к платежу.
	 * Необязательное поле.
	 */
	// receipt?: {
	// 	customer: Customer
	// 	items: ReceiptItem[]
	// }

	/**
	 * Информация о получателе платежа.
	 * Необязательное поле.
	 */
	recipient?: {
		/**
		 * Идентификатор получателя в платежной системе.
		 */
		gateway_id: string
	}

	/**
	 * Метод платежа.
	 * Необязательное поле.
	 */
	payment_method_data?: PaymentMethod

	/**
	 * Указывает, следует ли сразу захватывать платеж.
	 * Необязательное поле, по умолчанию false.
	 */
	capture?: boolean

	/**
	 * Тип подтверждения для платежа.
	 */
	confirmation: ConfirmationRequest

	/**
	 * Нужно ли сохранять метод платежа для будущих платежей.
	 * Необязательное поле.
	 */
	save_payment_method?: boolean

	/**
	 * Идентификатор клиента в системе продавца.
	 * Необязательное поле.
	 */
	merchant_customer_id?: string

	/**
	 * Дополнительные метаданные, связанные с платежом.
	 * Необязательное поле.
	 */
	metadata?: object
}
