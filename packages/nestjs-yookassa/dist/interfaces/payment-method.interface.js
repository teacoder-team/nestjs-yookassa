"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodsEnum = void 0;
/**
 * Перечисление возможных методов оплаты.
 * Каждый метод оплаты представлен уникальным типом.
 * @enum {string}
 */
var PaymentMethodsEnum;
(function (PaymentMethodsEnum) {
    /**
     * Банковская карта
     */
    PaymentMethodsEnum["bank_card"] = "bank_card";
    /**
     * YooMoney (бывший Яндекс.Деньги)
     */
    PaymentMethodsEnum["yoo_money"] = "yoo_money";
    /**
     * Qiwi кошелек
     */
    PaymentMethodsEnum["qiwi"] = "qiwi";
    /**
     * Сбербанк
     */
    PaymentMethodsEnum["sberbank"] = "sberbank";
    /**
     * Альфа-Банк
     */
    PaymentMethodsEnum["alfabank"] = "alfabank";
    /**
     * Тинькофф Банк
     */
    PaymentMethodsEnum["tinkoff_bank"] = "tinkoff_bank";
    /**
     * B2B Сбербанк
     */
    PaymentMethodsEnum["b2b_sberbank"] = "b2b_sberbank";
    /**
     * Система быстрых платежей
     */
    PaymentMethodsEnum["sbp"] = "sbp";
    /**
     * Баланс мобильного телефона
     */
    PaymentMethodsEnum["mobile_balance"] = "mobile_balance";
    /**
     * Наличные
     */
    PaymentMethodsEnum["cash"] = "cash";
    /**
     * Рассрочка
     */
    PaymentMethodsEnum["installments"] = "installments";
})(PaymentMethodsEnum || (exports.PaymentMethodsEnum = PaymentMethodsEnum = {}));
