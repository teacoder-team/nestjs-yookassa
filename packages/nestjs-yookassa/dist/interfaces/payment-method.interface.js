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
     * «Покупки в кредит» от СберБанка
     */
    PaymentMethodsEnum["sber_loan"] = "sber_loan";
    /**
     * Баланс мобильного телефона
     */
    PaymentMethodsEnum["mobile_balance"] = "mobile_balance";
    /**
     * Банковская карта
     */
    PaymentMethodsEnum["bank_card"] = "bank_card";
    /**
     * Наличные
     */
    PaymentMethodsEnum["cash"] = "cash";
    /**
     * Система быстрых платежей
     */
    PaymentMethodsEnum["sbp"] = "sbp";
    /**
     * B2B Сбербанк
     */
    PaymentMethodsEnum["b2b_sberbank"] = "b2b_sberbank";
    /**
     * Электронный сертификат
     */
    PaymentMethodsEnum["electronic_certificate"] = "electronic_certificate";
    /**
     * YooMoney
     */
    PaymentMethodsEnum["yoo_money"] = "yoo_money";
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
})(PaymentMethodsEnum || (exports.PaymentMethodsEnum = PaymentMethodsEnum = {}));
