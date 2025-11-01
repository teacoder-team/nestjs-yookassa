"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferStatusEnum = void 0;
/**
 * Статусы распределения денег между магазинами.
 */
var TransferStatusEnum;
(function (TransferStatusEnum) {
    /** Ожидает обработки. */
    TransferStatusEnum["PENDING"] = "pending";
    /** Ожидает подтверждения списания. */
    TransferStatusEnum["WAITING_FOR_CAPTURE"] = "waiting_for_capture";
    /** Успешно завершено. */
    TransferStatusEnum["SUCCEEDED"] = "succeeded";
    /** Отменено. */
    TransferStatusEnum["CANCELED"] = "canceled";
})(TransferStatusEnum || (exports.TransferStatusEnum = TransferStatusEnum = {}));
