"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleEnum = void 0;
/**
 * Перечисление поддерживаемых локалей.
 * Каждая локаль представляет собой комбинацию языка и страны.
 * @enum {string}
 */
var LocaleEnum;
(function (LocaleEnum) {
    /**
     * Русский язык.
     */
    LocaleEnum["ru_RU"] = "ru_RU";
    /**
     * Английский язык.
     */
    LocaleEnum["en_US"] = "en_US";
})(LocaleEnum || (exports.LocaleEnum = LocaleEnum = {}));
