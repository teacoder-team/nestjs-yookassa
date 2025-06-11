"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmationEnum = void 0;
/**
 * Перечисление типов подтверждений платежа.
 * Эти типы могут быть использованы для различных способов подтверждения транзакций.
 * @enum {string}
 */
var ConfirmationEnum;
(function (ConfirmationEnum) {
    /**
     * Встроенная форма подтверждения.
     */
    ConfirmationEnum["embedded"] = "embedded";
    /**
     * Внешняя форма подтверждения.
     */
    ConfirmationEnum["external"] = "external";
    /**
     * Подтверждение через мобильное приложение.
     */
    ConfirmationEnum["mobile_application"] = "mobile_application";
    /**
     * Подтверждение через QR код.
     */
    ConfirmationEnum["qr"] = "qr";
    /**
     * Подтверждение через редирект на внешний сайт.
     */
    ConfirmationEnum["redirect"] = "redirect";
})(ConfirmationEnum || (exports.ConfirmationEnum = ConfirmationEnum = {}));
