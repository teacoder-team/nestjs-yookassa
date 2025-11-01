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
    PaymentMethodsEnum["SBER_LOAN"] = "sber_loan";
    /**
     * Баланс мобильного телефона
     */
    PaymentMethodsEnum["MOBILE_BALANCE"] = "mobile_balance";
    /**
     * Банковская карта
     */
    PaymentMethodsEnum["BANK_CARD"] = "bank_card";
    /**
     * Наличные
     */
    PaymentMethodsEnum["CASH"] = "cash";
    /**
     * Система быстрых платежей
     */
    PaymentMethodsEnum["SBP"] = "sbp";
    /**
     * B2B Сбербанк
     */
    PaymentMethodsEnum["B2B_SBERBANK"] = "b2b_sberbank";
    /**
     * Электронный сертификат
     */
    PaymentMethodsEnum["ELECTRONIC_CERTIFICATE"] = "electronic_certificate";
    /**
     * YooMoney
     */
    PaymentMethodsEnum["YOOMONEY"] = "yoo_money";
    /**
     * Сбербанк
     */
    PaymentMethodsEnum["SBERBANK"] = "sberbank";
    /**
     * Альфа-Банк
     */
    PaymentMethodsEnum["ALFABANK"] = "alfabank";
    /**
     * Тинькофф Банк
     */
    PaymentMethodsEnum["T_BANK"] = "tinkoff_bank";
})(PaymentMethodsEnum || (exports.PaymentMethodsEnum = PaymentMethodsEnum = {}));
