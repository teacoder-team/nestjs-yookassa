"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceCancellationReasonEnum = exports.InvoiceCancellationPartyEnum = exports.InvoiceStatusEnum = void 0;
/**
 * Статусы счета
 */
var InvoiceStatusEnum;
(function (InvoiceStatusEnum) {
    /** Счет создан и ожидает оплаты */
    InvoiceStatusEnum["PENDING"] = "pending";
    /** Счет успешно оплачен */
    InvoiceStatusEnum["SUCCEEDED"] = "succeeded";
    /** Счет отменен или истек */
    InvoiceStatusEnum["CANCELED"] = "canceled";
})(InvoiceStatusEnum || (exports.InvoiceStatusEnum = InvoiceStatusEnum = {}));
/**
 * Инициаторы отмены счета
 */
var InvoiceCancellationPartyEnum;
(function (InvoiceCancellationPartyEnum) {
    InvoiceCancellationPartyEnum["MERCHANT"] = "merchant";
    InvoiceCancellationPartyEnum["YOO_MONEY"] = "yoo_money";
})(InvoiceCancellationPartyEnum || (exports.InvoiceCancellationPartyEnum = InvoiceCancellationPartyEnum = {}));
/**
 * Причины отмены счета
 */
var InvoiceCancellationReasonEnum;
(function (InvoiceCancellationReasonEnum) {
    InvoiceCancellationReasonEnum["INVOICE_CANCELED"] = "invoice_canceled";
    InvoiceCancellationReasonEnum["INVOICE_EXPIRED"] = "invoice_expired";
    InvoiceCancellationReasonEnum["GENERAL_DECLINE"] = "general_decline";
    InvoiceCancellationReasonEnum["PAYMENT_CANCELED"] = "payment_canceled";
    InvoiceCancellationReasonEnum["PAYMENT_EXPIRED_ON_CAPTURE"] = "payment_expired_on_capture";
})(InvoiceCancellationReasonEnum || (exports.InvoiceCancellationReasonEnum = InvoiceCancellationReasonEnum = {}));
