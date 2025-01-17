"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationTypesEnum = void 0;
/**
 * Перечисление типов подтверждений платежа.
 * Эти типы могут быть использованы для различных способов подтверждения транзакций.
 * @enum {string}
 */
var ConfirmationTypesEnum;
(function (ConfirmationTypesEnum) {
    /**
     * Встроенная форма подтверждения.
     */
    ConfirmationTypesEnum["embedded"] = "embedded";
    /**
     * Внешняя форма подтверждения.
     */
    ConfirmationTypesEnum["external"] = "external";
    /**
     * Подтверждение через мобильное приложение.
     */
    ConfirmationTypesEnum["mobile_application"] = "mobile_application";
    /**
     * Подтверждение через QR код.
     */
    ConfirmationTypesEnum["qr"] = "qr";
    /**
     * Подтверждение через редирект на внешний сайт.
     */
    ConfirmationTypesEnum["redirect"] = "redirect";
})(ConfirmationTypesEnum || (exports.ConfirmationTypesEnum = ConfirmationTypesEnum = {}));
