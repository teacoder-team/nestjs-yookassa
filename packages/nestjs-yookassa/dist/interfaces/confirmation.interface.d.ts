import type { LocaleEnum } from './common.interface';
/**
 * Тип подтверждения, который может быть одним из нескольких типов.
 * @type {ConfirmationRedirect | ConfirmationEmbedded | ConfirmationQR | ConfirmationExternal | ConfirmationMobileApp}
 */
export type Confirmation = ConfirmationEmbedded | ConfirmationExternal | ConfirmationMobileApp | ConfirmationQR | ConfirmationRedirect;
/**
 * Перечисление типов подтверждений платежа.
 * Эти типы могут быть использованы для различных способов подтверждения транзакций.
 * @enum {string}
 */
export declare enum ConfirmationEnum {
    /**
     * Встроенная форма подтверждения.
     */
    embedded = "embedded",
    /**
     * Внешняя форма подтверждения.
     */
    external = "external",
    /**
     * Подтверждение через мобильное приложение.
     */
    mobile_application = "mobile_application",
    /**
     * Подтверждение через QR код.
     */
    qr = "qr",
    /**
     * Подтверждение через редирект на внешний сайт.
     */
    redirect = "redirect"
}
/**
 * Тип для подтверждения через встроенную форму.
 * Используется при встроенном подтверждении внутри текущего приложения.
 */
export interface ConfirmationEmbedded {
    /**
     * Тип подтверждения — встроенная форма.
     */
    type: ConfirmationEnum.embedded;
    /**
     * Локализация, которая должна быть использована.
     * Необязательное поле.
     */
    locale?: LocaleEnum;
}
/**
 * Тип для подтверждения через внешний источник.
 */
export interface ConfirmationExternal {
    /**
     * Тип подтверждения — внешний источник.
     */
    type: ConfirmationEnum.external;
    /**
     * Локализация, которая должна быть использована.
     * Необязательное поле.
     */
    locale?: LocaleEnum;
}
/**
 * Тип для подтверждения через мобильное приложение.
 */
export interface ConfirmationMobileApp {
    /**
     * Тип подтверждения — мобильное приложение.
     */
    type: ConfirmationEnum.mobile_application;
    /**
     * Локализация, которая должна быть использована.
     * Необязательное поле.
     */
    locale?: LocaleEnum;
    /**
     * URL возврата после подтверждения.
     */
    return_url: string;
}
/**
 * Тип для подтверждения через QR код.
 */
export interface ConfirmationQR {
    /**
     * Тип подтверждения — QR код.
     */
    type: ConfirmationEnum.qr;
    /**
     * Локализация, которая должна быть использована.
     * Необязательное поле.
     */
    locale?: LocaleEnum;
    /**
     * URL возврата после подтверждения.
     */
    return_url: string;
}
/**
 * Тип для подтверждения через редирект.
 * Используется при необходимости перенаправить пользователя на внешний URL для подтверждения.
 */
export interface ConfirmationRedirect {
    /**
     * Тип подтверждения — редирект.
     */
    type: ConfirmationEnum.redirect;
    /**
     * Принудительное подтверждение.
     * Необязательное поле.
     */
    enforce?: boolean;
    /**
     * Локализация, которая должна быть использована.
     * Необязательное поле.
     */
    locale?: LocaleEnum;
    /**
     * URL возврата после подтверждения.
     */
    return_url: string;
}
