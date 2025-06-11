"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundStatusEnum = void 0;
var RefundStatusEnum;
(function (RefundStatusEnum) {
    /**
     * Платеж в процессе.
     */
    RefundStatusEnum["pending"] = "pending";
    /**
     * Платеж выполнен успешно.
     */
    RefundStatusEnum["succeeded"] = "succeeded";
    /**
     * Платеж отменен.
     */
    RefundStatusEnum["canceled"] = "canceled";
})(RefundStatusEnum || (exports.RefundStatusEnum = RefundStatusEnum = {}));
