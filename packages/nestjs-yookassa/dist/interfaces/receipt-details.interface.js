"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptRegistrationEnum = exports.TaxSystemCodesEnum = exports.VatCodesEnum = void 0;
/**
 * Перечисление кодов НДС (налога на добавленную стоимость).
 * Эти коды соответствуют различным ставкам НДС.
 * @enum {number}
 */
var VatCodesEnum;
(function (VatCodesEnum) {
    /**
     * Без НДС.
     */
    VatCodesEnum[VatCodesEnum["ndsNone"] = 1] = "ndsNone";
    /**
     * НДС 0%.
     */
    VatCodesEnum[VatCodesEnum["nds0"] = 2] = "nds0";
    /**
     * НДС 10%.
     */
    VatCodesEnum[VatCodesEnum["nds10"] = 3] = "nds10";
    /**
     * НДС 20%.
     */
    VatCodesEnum[VatCodesEnum["nds20"] = 4] = "nds20";
    /**
     * НДС 10/110 (для некоторых товаров).
     */
    VatCodesEnum[VatCodesEnum["nds10/110"] = 5] = "nds10/110";
    /**
     * НДС 20/120 (для некоторых товаров).
     */
    VatCodesEnum[VatCodesEnum["nds20/120"] = 6] = "nds20/120";
})(VatCodesEnum || (exports.VatCodesEnum = VatCodesEnum = {}));
/**
 * Перечисление кодов систем налогообложения.
 * Каждая система налогообложения имеет свой код.
 * @enum {number}
 */
var TaxSystemCodesEnum;
(function (TaxSystemCodesEnum) {
    /**
     * Общая система налогообложения.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["OSN"] = 1] = "OSN";
    /**
     * Упрощенная система налогообложения 6%.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["USN6"] = 2] = "USN6";
    /**
     * Упрощенная система налогообложения 15%.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["USN15"] = 3] = "USN15";
    /**
     * Единый налог на вмененный доход.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["ENVD"] = 4] = "ENVD";
    /**
     * Единый сельскохозяйственный налог.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["ESN"] = 5] = "ESN";
    /**
     * Патентная система налогообложения.
     */
    TaxSystemCodesEnum[TaxSystemCodesEnum["PSN"] = 6] = "PSN";
})(TaxSystemCodesEnum || (exports.TaxSystemCodesEnum = TaxSystemCodesEnum = {}));
/**
 * Перечисление состояний регистрации чека.
 * @enum {string}
 */
var ReceiptRegistrationEnum;
(function (ReceiptRegistrationEnum) {
    /**
     * Ожидает регистрации
     */
    ReceiptRegistrationEnum["pending"] = "pending";
    /**
     * Успешно зарегистрирован
     */
    ReceiptRegistrationEnum["succeeded"] = "succeeded";
    /**
     * Регистрация отменена
     */
    ReceiptRegistrationEnum["canceled"] = "canceled";
})(ReceiptRegistrationEnum || (exports.ReceiptRegistrationEnum = ReceiptRegistrationEnum = {}));
