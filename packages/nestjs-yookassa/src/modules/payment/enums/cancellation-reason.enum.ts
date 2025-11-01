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
