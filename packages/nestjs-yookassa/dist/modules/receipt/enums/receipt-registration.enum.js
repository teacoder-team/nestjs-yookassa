"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptRegistrationEnum = void 0;
/**
 * Перечисление состояний регистрации чека.
 * @enum {string}
 */
var ReceiptRegistrationEnum;
(function (ReceiptRegistrationEnum) {
    /**
     * Ожидает регистрации
     */
    ReceiptRegistrationEnum["PENDING"] = "pending";
    /**
     * Успешно зарегистрирован
     */
    ReceiptRegistrationEnum["SUCCEEDED"] = "succeeded";
    /**
     * Регистрация отменена
     */
    ReceiptRegistrationEnum["CANCELED"] = "canceled";
})(ReceiptRegistrationEnum || (exports.ReceiptRegistrationEnum = ReceiptRegistrationEnum = {}));
