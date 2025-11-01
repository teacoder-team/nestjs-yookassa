import { LocaleEnum } from '../../../../common/enums';
import { ConfirmationEnum } from '../../enums';
/**
 * Универсальный тип подтверждения, который может быть одним из сценариев.
 */
export type ConfirmationResponse = ConfirmationRedirect | ConfirmationEmbedded | ConfirmationExternal | ConfirmationMobileApp | ConfirmationQR;
/**
 * Применяется, когда нужно отправить пользователя по URL на подтверждение.
 */
interface ConfirmationRedirect {
    type: ConfirmationEnum.REDIRECT;
    /** URL для перенаправления пользователя */
    confirmation_url: string;
    /** Принудительная аутентификация 3-D Secure */
    enforce?: boolean;
    /** Локализация */
    locale?: LocaleEnum;
    /** URL возврата */
    return_url?: string;
}
/**
 * Токен для подтверждения через виджет ЮKassa.
 */
interface ConfirmationEmbedded {
    type: ConfirmationEnum.EMBEDDED;
    /** Токен для инициализации виджета */
    confirmation_token: string;
}
/**
 * Просто сигнал, что подтверждение проходит во внешней системе.
 */
interface ConfirmationExternal {
    type: ConfirmationEnum.EXTERNAL;
}
/**
 * Возврат диплинка в мобильное приложение.
 */
interface ConfirmationMobileApp {
    type: ConfirmationEnum.MOBILE_APPLICATION;
    /** Диплинк на приложение для подтверждения */
    confirmation_url: string;
    /** Локализация */
    locale?: LocaleEnum;
}
/**
 * Возвращает данные для генерации QR-кода.
 */
interface ConfirmationQR {
    type: ConfirmationEnum.QR_CODE;
    /** Данные для генерации QR-кода */
    confirmation_data: string;
    /** Локализация */
    locale?: LocaleEnum;
}
export {};
