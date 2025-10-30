import type { Amount } from './common.interface'
import type { ConfirmationResponse } from './confirmation.interface'
import type { PaymentMethod } from './payment-method.interface'
import type { ReceiptRegistrationEnum } from './receipt-details.interface'

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
 * Инициаторы отмены платежа.
 */
export enum CancellationPartyEnum {
	/**
	 * Продавец товаров и услуг (вы).
	 */
	MERCHANT = 'merchant',

	/**
	 * ЮKassa.
	 */
	YOO_MONEY = 'yoo_money',

	/**
	 * Любые участники процесса платежа, кроме ЮKassa и продавца
	 * (например, эмитент, сторонний платежный сервис).
	 */
	PAYMENT_NETWORK = 'payment_network'
}

/**
 * Причины отмены платежа.
 */
export enum CancellationReasonEnum {
	/** Не пройдена аутентификация по 3-D Secure. */
	THREE_D_SECURE_FAILED = '3d_secure_failed',

	/** Оплата данным платежным средством отклонена по неизвестным причинам. */
	CALL_ISSUER = 'call_issuer',

	/** Платеж отменен по API при оплате в две стадии. */
	CANCELED_BY_MERCHANT = 'canceled_by_merchant',

	/** Истек срок действия банковской карты. */
	CARD_EXPIRED = 'card_expired',

	/** Запрет оплаты банковской картой, выпущенной в этой стране. */
	COUNTRY_FORBIDDEN = 'country_forbidden',

	/** Закончился срок жизни сделки (для безопасной сделки). */
	DEAL_EXPIRED = 'deal_expired',

	/** Истек срок списания оплаты у двухстадийного платежа. */
	EXPIRED_ON_CAPTURE = 'expired_on_capture',

	/** Истек срок оплаты: пользователь не подтвердил платеж вовремя. */
	EXPIRED_ON_CONFIRMATION = 'expired_on_confirmation',

	/** Платеж заблокирован из-за подозрения в мошенничестве. */
	FRAUD_SUSPECTED = 'fraud_suspected',

	/** Причина не детализирована. */
	GENERAL_DECLINE = 'general_decline',

	/** Превышены ограничения на платежи для кошелька ЮMoney. */
	IDENTIFICATION_REQUIRED = 'identification_required',

	/** Не хватает денег для оплаты. */
	INSUFFICIENT_FUNDS = 'insufficient_funds',

	/** Технические неполадки на стороне ЮKassa. */
	INTERNAL_TIMEOUT = 'internal_timeout',

	/** Неправильно указан номер карты. */
	INVALID_CARD_NUMBER = 'invalid_card_number',

	/** Неправильно указан код CVV2 (CVC2, CID). */
	INVALID_CSC = 'invalid_csc',

	/** Организация, выпустившая платежное средство, недоступна. */
	ISSUER_UNAVAILABLE = 'issuer_unavailable',

	/** Исчерпан лимит платежей для данного платежного средства или магазина. */
	PAYMENT_METHOD_LIMIT_EXCEEDED = 'payment_method_limit_exceeded',

	/** Запрещены операции данным платежным средством. */
	PAYMENT_METHOD_RESTRICTED = 'payment_method_restricted',

	/** Пользователь отозвал разрешение на автоплатежи. */
	PERMISSION_REVOKED = 'permission_revoked',

	/** Нельзя заплатить с номера телефона этого мобильного оператора. */
	UNSUPPORTED_MOBILE_OPERATOR = 'unsupported_mobile_operator'
}

/**
 * Информация об отмене платежа.
 * Содержит комментарий к статусу canceled: кто отменил платеж и по какой причине.
 */
export interface CancellationDetails {
	/**
	 * Участник процесса платежа, который принял решение об отмене транзакции.
	 */
	party: CancellationPartyEnum

	/**
	 * Причина отмены платежа.
	 */
	reason: CancellationReasonEnum
}

/**
 * Статусы распределения денег между магазинами.
 */
export enum TransferStatusEnum {
	/** Ожидает обработки. */
	PENDING = 'pending',

	/** Ожидает подтверждения списания. */
	WAITING_FOR_CAPTURE = 'waiting_for_capture',

	/** Успешно завершено. */
	SUCCEEDED = 'succeeded',

	/** Отменено. */
	CANCELED = 'canceled'
}

/**
 * Операция распределения платежа — перечисление денег магазину.
 */
export interface Settlement {
	/**
	 * Тип операции. Всегда "payout".
	 */
	type: 'payout'

	/**
	 * Сумма вознаграждения продавца.
	 */
	amount: Amount

	/**
	 * Идентификатор покупателя в вашей системе,
	 * например электронная почта или номер телефона.
	 * Не более 200 символов.
	 * Необязательное поле.
	 */
	merchant_customer_id?: string
}

/**
 * Данные о сделке, в составе которой проходит платеж.
 */
interface Deal {
	/**
	 * Идентификатор сделки.
	 */
	id: string

	/**
	 * Данные о распределении денег (массив операций).
	 */
	settlements: Settlement[]
}

/**
 * Данные о распределении денег — сколько и в какой магазин нужно перевести.
 */
export interface Transfer {
	/**
	 * Идентификатор магазина, в пользу которого принимается оплата.
	 */
	account_id: string

	/**
	 * Сумма, которую необходимо перечислить магазину.
	 */
	amount: Amount

	/**
	 * Статус распределения денег между магазинами.
	 */
	status: TransferStatusEnum

	/**
	 * Комиссия за проданные товары и услуги, удерживаемая с магазина в вашу пользу.
	 * Необязательное поле.
	 */
	platform_fee_amount?: Amount

	/**
	 * Описание транзакции (не более 128 символов),
	 * которое продавец увидит в личном кабинете ЮKassa.
	 * Например: «Заказ маркетплейса №72».
	 * Необязательное поле.
	 */
	description?: string

	/**
	 * Дополнительные данные для вашей системы,
	 * передаются в виде набора пар «ключ-значение»,
	 * максимум 16 ключей, имя ключа не более 32 символов,
	 * значение ключа не более 512 символов.
	 * Необязательное поле.
	 */
	metadata?: Record<string, string>
}

/**
 * Данные о прохождении аутентификации по 3‑D Secure.
 */
export interface ThreeDSecure {
	/**
	 * Отображение пользователю формы для прохождения аутентификации по 3‑D Secure.
	 * true — форма была показана пользователю,
	 * false — платеж проходил без аутентификации по 3‑D Secure.
	 */
	applied: boolean
}

/**
 * Данные об авторизации платежа при оплате банковской картой.
 * Присутствуют только для способов оплаты: банковская карта, Mir Pay, SberPay, T-Pay.
 */
export interface AuthorizationDetails {
	/**
	 * Retrieval Reference Number — идентификатор банковской транзакции.
	 * Необязательное поле.
	 */
	rrn?: string

	/**
	 * Код авторизации, выдается эмитентом и подтверждает проведение авторизации.
	 * Необязательное поле.
	 */
	auth_code?: string

	/**
	 * Данные о прохождении пользователем аутентификации по 3‑D Secure.
	 */
	three_d_secure: ThreeDSecure

	/**
	 * Данные о распределении денег — сколько и в какой магазин нужно перевести.
	 * Присутствует, если используется Сплитование платежей.
	 * Необязательное поле.
	 */
	transfers?: Transfer[]

	/**
	 * Данные о сделке, в составе которой проходит платеж.
	 * Присутствует, если проводится Безопасная сделка.
	 * Необязательное поле.
	 */
	deal?: Deal

	/**
	 * Данные о выставленном счете, в рамках которого проведен платеж.
	 * Необязательное поле.
	 */
	invoice_details?: {
		/**
		 * Идентификатор счета в ЮKassa.
		 * Необязательное поле.
		 */
		id?: string
	}
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

	/**
	 * Информация об отмене платежа.
	 * Необязательное поле.
	 */
	cancellation_details?: CancellationDetails

	/**
	 * Данные об авторизации платежа при оплате банковской картой.
	 * Присутствуют только для способов оплаты: банковская карта, Mir Pay, SberPay, T-Pay.
	 * Необязательное поле.
	 */
	authorization_details?: AuthorizationDetails

	/**
	 * Данные о распределении денег — сколько и в какой магазин нужно перевести.
	 * Необязательное поле.
	 */
	transfers?: Transfer

	/**
	 * Данные о сделке, в составе которой проходит платеж.
	 * Необязательное поле.
	 */
	deal?: Deal

	/**
	 * Идентификатор покупателя в вашей системе, например электронная почта или номер телефона.
	 * Необязательное поле.
	 */
	merchant_customer_id?: string
}
