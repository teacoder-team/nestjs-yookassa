/**
 * Статусы счета
 */
export declare enum InvoiceStatusEnum {
    /** Счет создан и ожидает оплаты */
    PENDING = "pending",
    /** Счет успешно оплачен */
    SUCCEEDED = "succeeded",
    /** Счет отменен или истек */
    CANCELED = "canceled"
}
