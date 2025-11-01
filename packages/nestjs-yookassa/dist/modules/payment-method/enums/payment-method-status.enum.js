"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodStatusEnum = void 0;
/**
 * Статус сохраненного метода оплаты в YooKassa.
 */
var PaymentMethodStatusEnum;
(function (PaymentMethodStatusEnum) {
    /**
     * Метод оплаты создан, но еще не подтвержден пользователем.
     */
    PaymentMethodStatusEnum["PENDING"] = "pending";
    /**
     * Метод оплаты активен и может быть использован для платежей.
     */
    PaymentMethodStatusEnum["ACTIVE"] = "active";
    /**
     * Метод оплаты отключен и не может быть использован.
     */
    PaymentMethodStatusEnum["INACTIVE"] = "inactive";
})(PaymentMethodStatusEnum || (exports.PaymentMethodStatusEnum = PaymentMethodStatusEnum = {}));
