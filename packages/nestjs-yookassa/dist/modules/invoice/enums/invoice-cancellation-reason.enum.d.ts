/**
 * Причины отмены счета
 */
export declare enum InvoiceCancellationReasonEnum {
    INVOICE_CANCELED = "invoice_canceled",
    INVOICE_EXPIRED = "invoice_expired",
    GENERAL_DECLINE = "general_decline",
    PAYMENT_CANCELED = "payment_canceled",
    PAYMENT_EXPIRED_ON_CAPTURE = "payment_expired_on_capture"
}
