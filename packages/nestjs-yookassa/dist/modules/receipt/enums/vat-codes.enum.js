"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VatCodesEnum = void 0;
/**
 * Перечисление кодов НДС (налога на добавленную стоимость) YooKassa.
 * Используется в позициях корзины, чеках и счетах.
 */
var VatCodesEnum;
(function (VatCodesEnum) {
    /**
     * Без НДС.
     */
    VatCodesEnum[VatCodesEnum["NDS_NONE"] = 1] = "NDS_NONE";
    /**
     * НДС 0%.
     */
    VatCodesEnum[VatCodesEnum["NDS_0"] = 2] = "NDS_0";
    /**
     * НДС 10%.
     */
    VatCodesEnum[VatCodesEnum["NDS_10"] = 3] = "NDS_10";
    /**
     * НДС 20%.
     */
    VatCodesEnum[VatCodesEnum["NDS_20"] = 4] = "NDS_20";
    /**
     * НДС 10/110 (расчетный способ).
     * Часто используется для льготных категорий.
     */
    VatCodesEnum[VatCodesEnum["NDS_10_110"] = 5] = "NDS_10_110";
    /**
     * НДС 20/120 (расчетный способ).
     */
    VatCodesEnum[VatCodesEnum["NDS_20_120"] = 6] = "NDS_20_120";
})(VatCodesEnum || (exports.VatCodesEnum = VatCodesEnum = {}));
