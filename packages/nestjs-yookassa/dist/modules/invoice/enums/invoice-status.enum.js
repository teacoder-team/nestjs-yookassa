"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceStatusEnum = void 0;
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
