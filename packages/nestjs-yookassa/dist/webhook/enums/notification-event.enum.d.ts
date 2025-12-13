/**
 * Типы событий, о которых YooKassa отправляет уведомления.
 */
export declare enum NotificationEventEnum {
    /**
     * Платеж ожидает подтверждения.
     */
    PAYMENT_WAITING_FOR_CAPTURE = "payment.waiting_for_capture",
    /**
     * Платеж успешно завершен.
     */
    PAYMENT_SUCCEEDED = "payment.succeeded",
    /**
     * Платеж отменен.
     */
    PAYMENT_CANCELED = "payment.canceled",
    /**
     * Возврат успешно завершен.
     */
    REFUND_SUCCEEDED = "refund.succeeded"
}
