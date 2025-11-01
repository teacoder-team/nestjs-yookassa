"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefundStatusEnum = void 0;
var RefundStatusEnum;
(function (RefundStatusEnum) {
    /**
     * Возврат в процессе.
     */
    RefundStatusEnum["PENDING"] = "pending";
    /**
     * Возврат выполнен успешно.
     */
    RefundStatusEnum["SUCCEEDED"] = "succeeded";
    /**
     * Возврат отменен.
     */
    RefundStatusEnum["CANCELED"] = "canceled";
})(RefundStatusEnum || (exports.RefundStatusEnum = RefundStatusEnum = {}));
