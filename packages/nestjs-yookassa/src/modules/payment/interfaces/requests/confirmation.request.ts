import type { LocaleEnum } from '../../../../common/enums'
import type { ConfirmationEnum } from '../../enums'

/**
 * Тип подтверждения, который может быть одним из нескольких типов.
 * @type {ConfirmationRedirect | ConfirmationEmbedded | ConfirmationQR | ConfirmationExternal | ConfirmationMobileApp}
 */
export type ConfirmationRequest =
	| ConfirmationEmbedded
	| ConfirmationExternal
	| ConfirmationMobileApp
	| ConfirmationQR
	| ConfirmationRedirect

/**
 * Тип для подтверждения через встроенную форму.
 * Используется при встроенном подтверждении внутри текущего приложения.
 */
export interface ConfirmationEmbedded {
	/**
	 * Тип подтверждения — встроенная форма.
	 */
	type: ConfirmationEnum.EMBEDDED

	/**
	 * Локализация, которая должна быть использована.
	 * Необязательное поле.
	 */
	locale?: LocaleEnum
}

/**
 * Тип для подтверждения через внешний источник.
 */
export interface ConfirmationExternal {
	/**
	 * Тип подтверждения — внешний источник.
	 */
	type: ConfirmationEnum.EXTERNAL

	/**
	 * Локализация, которая должна быть использована.
	 * Необязательное поле.
	 */
	locale?: LocaleEnum
}

/**
 * Тип для подтверждения через мобильное приложение.
 */
export interface ConfirmationMobileApp {
	/**
	 * Тип подтверждения — мобильное приложение.
	 */
	type: ConfirmationEnum.MOBILE_APPLICATION

	/**
	 * Локализация, которая должна быть использована.
	 * Необязательное поле.
	 */
	locale?: LocaleEnum

	/**
	 * URL возврата после подтверждения.
	 */
	return_url: string
}

/**
 * Тип для подтверждения через QR код.
 */
export interface ConfirmationQR {
	/**
	 * Тип подтверждения — QR код.
	 */
	type: ConfirmationEnum.QR_CODE

	/**
	 * Локализация, которая должна быть использована.
	 * Необязательное поле.
	 */
	locale?: LocaleEnum

	/**
	 * URL возврата после подтверждения.
	 */
	return_url: string
}

/**
 * Тип для подтверждения через редирект.
 * Используется при необходимости перенаправить пользователя на внешний URL для подтверждения.
 */
export interface ConfirmationRedirect {
	/**
	 * Тип подтверждения — редирект.
	 */
	type: ConfirmationEnum.REDIRECT

	/**
	 * Принудительное подтверждение.
	 * Необязательное поле.
	 */
	enforce?: boolean

	/**
	 * Локализация, которая должна быть использована.
	 * Необязательное поле.
	 */
	locale?: LocaleEnum

	/**
	 * URL возврата после подтверждения.
	 */
	return_url: string
}
