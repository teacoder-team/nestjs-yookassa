"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaxSystemCodesEnum = void 0;
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
