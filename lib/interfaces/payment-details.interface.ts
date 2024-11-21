import type { Amount } from './common.interface'
import type { Confirmation } from './confirmation.interface'
import type { PaymentMethod } from './payment-method.interface'
import type { ReceiptRegistrationEnum } from './receipt.interface'

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

/**
 * Тип, представляющий информацию о платеже.
 */
export interface PaymentDetails {
	/**
	 * Идентификатор платежа.
	 */
	id: string

	/**
	 * Статус платежа.
	 */
	status: PaymentStatusEnum

	/**
	 * Сумма платежа.
	 */
	amount: Amount

	/**
	 * Сумма, полученная от платежа.
	 * Необязательное поле.
	 */
	income_amount?: Amount

	/**
	 * Описание платежа.
	 * Необязательное поле.
	 */
	description?: string

	/**
	 * Информация о получателе платежа.
	 */
	recipient: {
		/**
		 * Идентификатор аккаунта получателя.
		 */
		account_id: string

		/**
		 * Идентификатор шлюза получателя.
		 */
		gateway_id: string
	}

	/**
	 * Метод платежа.
	 * Необязательное поле.
	 */
	payment_method?: PaymentMethod

	/**
	 * Время захвата платежа.
	 * Необязательное поле.
	 */
	captured_at?: string

	/**
	 * Время создания платежа.
	 */
	created_at: string

	/**
	 * Время истечения срока действия платежа.
	 * Необязательное поле.
	 */
	expires_at?: string

	/**
	 * Подтверждение платежа.
	 * Необязательное поле.
	 */
	confirmation?: Confirmation

	/**
	 * Является ли платеж тестовым.
	 */
	test: boolean

	/**
	 * Сумма возврата, если она есть.
	 * Необязательное поле.
	 */
	refunded_amount?: Amount

	/**
	 * Был ли платеж произведен.
	 */
	paid: boolean

	/**
	 * Может ли платеж быть возвращен.
	 */
	refundable: boolean

	/**
	 * Статус регистрации чека.
	 * Необязательное поле.
	 */
	receipt_registration?: ReceiptRegistrationEnum

	/**
	 * Дополнительные метаданные платежа.
	 * Необязательное поле.
	 */
	metadata?: object
}
