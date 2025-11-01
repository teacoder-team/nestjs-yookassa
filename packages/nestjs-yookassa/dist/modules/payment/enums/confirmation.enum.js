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
    ConfirmationEnum["EMBEDDED"] = "embedded";
    /**
     * Внешняя форма подтверждения.
     */
    ConfirmationEnum["EXTERNAL"] = "external";
    /**
     * Подтверждение через мобильное приложение.
     */
    ConfirmationEnum["MOBILE_APPLICATION"] = "mobile_application";
    /**
     * Подтверждение через QR код.
     */
    ConfirmationEnum["QR_CODE"] = "qr";
    /**
     * Подтверждение через редирект на внешний сайт.
     */
    ConfirmationEnum["REDIRECT"] = "redirect";
})(ConfirmationEnum || (exports.ConfirmationEnum = ConfirmationEnum = {}));
