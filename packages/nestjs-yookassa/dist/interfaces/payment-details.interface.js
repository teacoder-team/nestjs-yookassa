"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferStatusEnum = exports.CancellationReasonEnum = exports.CancellationPartyEnum = exports.PaymentStatusEnum = void 0;
/**
 * Перечисление возможных статусов платежа.
 * @enum {string}
 */
var PaymentStatusEnum;
(function (PaymentStatusEnum) {
    /**
     * Платеж ожидает обработки.
     */
    PaymentStatusEnum["PENDING"] = "pending";
    /**
     * Платеж ожидает захвата.
     */
    PaymentStatusEnum["WAITING_FOR_CAPTURE"] = "waiting_for_capture";
    /**
     * Платеж успешно завершен.
     */
    PaymentStatusEnum["SUCCEEDED"] = "succeeded";
    /**
     * Платеж отменен.
     */
    PaymentStatusEnum["CANCELED"] = "canceled";
})(PaymentStatusEnum || (exports.PaymentStatusEnum = PaymentStatusEnum = {}));
/**
 * Инициаторы отмены платежа.
 */
var CancellationPartyEnum;
(function (CancellationPartyEnum) {
    /**
     * Продавец товаров и услуг (вы).
     */
    CancellationPartyEnum["MERCHANT"] = "merchant";
    /**
     * ЮKassa.
     */
    CancellationPartyEnum["YOO_MONEY"] = "yoo_money";
    /**
     * Любые участники процесса платежа, кроме ЮKassa и продавца
     * (например, эмитент, сторонний платежный сервис).
     */
    CancellationPartyEnum["PAYMENT_NETWORK"] = "payment_network";
})(CancellationPartyEnum || (exports.CancellationPartyEnum = CancellationPartyEnum = {}));
/**
 * Причины отмены платежа.
 */
var CancellationReasonEnum;
(function (CancellationReasonEnum) {
    /** Не пройдена аутентификация по 3-D Secure. */
    CancellationReasonEnum["THREE_D_SECURE_FAILED"] = "3d_secure_failed";
    /** Оплата данным платежным средством отклонена по неизвестным причинам. */
    CancellationReasonEnum["CALL_ISSUER"] = "call_issuer";
    /** Платеж отменен по API при оплате в две стадии. */
    CancellationReasonEnum["CANCELED_BY_MERCHANT"] = "canceled_by_merchant";
    /** Истек срок действия банковской карты. */
    CancellationReasonEnum["CARD_EXPIRED"] = "card_expired";
    /** Запрет оплаты банковской картой, выпущенной в этой стране. */
    CancellationReasonEnum["COUNTRY_FORBIDDEN"] = "country_forbidden";
    /** Закончился срок жизни сделки (для безопасной сделки). */
    CancellationReasonEnum["DEAL_EXPIRED"] = "deal_expired";
    /** Истек срок списания оплаты у двухстадийного платежа. */
    CancellationReasonEnum["EXPIRED_ON_CAPTURE"] = "expired_on_capture";
    /** Истек срок оплаты: пользователь не подтвердил платеж вовремя. */
    CancellationReasonEnum["EXPIRED_ON_CONFIRMATION"] = "expired_on_confirmation";
    /** Платеж заблокирован из-за подозрения в мошенничестве. */
    CancellationReasonEnum["FRAUD_SUSPECTED"] = "fraud_suspected";
    /** Причина не детализирована. */
    CancellationReasonEnum["GENERAL_DECLINE"] = "general_decline";
    /** Превышены ограничения на платежи для кошелька ЮMoney. */
    CancellationReasonEnum["IDENTIFICATION_REQUIRED"] = "identification_required";
    /** Не хватает денег для оплаты. */
    CancellationReasonEnum["INSUFFICIENT_FUNDS"] = "insufficient_funds";
    /** Технические неполадки на стороне ЮKassa. */
    CancellationReasonEnum["INTERNAL_TIMEOUT"] = "internal_timeout";
    /** Неправильно указан номер карты. */
    CancellationReasonEnum["INVALID_CARD_NUMBER"] = "invalid_card_number";
    /** Неправильно указан код CVV2 (CVC2, CID). */
    CancellationReasonEnum["INVALID_CSC"] = "invalid_csc";
    /** Организация, выпустившая платежное средство, недоступна. */
    CancellationReasonEnum["ISSUER_UNAVAILABLE"] = "issuer_unavailable";
    /** Исчерпан лимит платежей для данного платежного средства или магазина. */
    CancellationReasonEnum["PAYMENT_METHOD_LIMIT_EXCEEDED"] = "payment_method_limit_exceeded";
    /** Запрещены операции данным платежным средством. */
    CancellationReasonEnum["PAYMENT_METHOD_RESTRICTED"] = "payment_method_restricted";
    /** Пользователь отозвал разрешение на автоплатежи. */
    CancellationReasonEnum["PERMISSION_REVOKED"] = "permission_revoked";
    /** Нельзя заплатить с номера телефона этого мобильного оператора. */
    CancellationReasonEnum["UNSUPPORTED_MOBILE_OPERATOR"] = "unsupported_mobile_operator";
})(CancellationReasonEnum || (exports.CancellationReasonEnum = CancellationReasonEnum = {}));
/**
 * Статусы распределения денег между магазинами.
 */
var TransferStatusEnum;
(function (TransferStatusEnum) {
    /** Ожидает обработки. */
    TransferStatusEnum["PENDING"] = "pending";
    /** Ожидает подтверждения списания. */
    TransferStatusEnum["WAITING_FOR_CAPTURE"] = "waiting_for_capture";
    /** Успешно завершено. */
    TransferStatusEnum["SUCCEEDED"] = "succeeded";
    /** Отменено. */
    TransferStatusEnum["CANCELED"] = "canceled";
})(TransferStatusEnum || (exports.TransferStatusEnum = TransferStatusEnum = {}));
