"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEventEnum = void 0;
/**
 * Типы событий, о которых YooKassa отправляет уведомления.
 */
var NotificationEventEnum;
(function (NotificationEventEnum) {
    /**
     * Платеж ожидает подтверждения.
     */
    NotificationEventEnum["PAYMENT_WAITING_FOR_CAPTURE"] = "payment.waiting_for_capture";
    /**
     * Платеж успешно завершен.
     */
    NotificationEventEnum["PAYMENT_SUCCEEDED"] = "payment.succeeded";
    /**
     * Платеж отменен.
     */
    NotificationEventEnum["PAYMENT_CANCELED"] = "payment.canceled";
    /**
     * Возврат успешно завершен.
     */
    NotificationEventEnum["REFUND_SUCCEEDED"] = "refund.succeeded";
})(NotificationEventEnum || (exports.NotificationEventEnum = NotificationEventEnum = {}));
