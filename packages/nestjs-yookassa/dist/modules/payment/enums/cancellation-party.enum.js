"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancellationPartyEnum = void 0;
/**
 * Инициаторы отмены платежа.
 */
var CancellationPartyEnum;
(function (CancellationPartyEnum) {
    /**
     * Продавец товаров и услуг (вы).
     */
    CancellationPartyEnum["MERCHANT"] = "merchant";
    /**
     * ЮKassa.
     */
    CancellationPartyEnum["YOO_MONEY"] = "yoo_money";
    /**
     * Любые участники процесса платежа, кроме ЮKassa и продавца
     * (например, эмитент, сторонний платежный сервис).
     */
    CancellationPartyEnum["PAYMENT_NETWORK"] = "payment_network";
})(CancellationPartyEnum || (exports.CancellationPartyEnum = CancellationPartyEnum = {}));
