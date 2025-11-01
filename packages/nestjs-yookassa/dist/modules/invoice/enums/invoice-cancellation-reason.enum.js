"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceCancellationReasonEnum = void 0;
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
