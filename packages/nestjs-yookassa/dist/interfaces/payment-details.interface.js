"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentStatusEnum = void 0;
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
