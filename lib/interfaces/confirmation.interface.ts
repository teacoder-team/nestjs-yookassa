import type { LocaleEnum } from './common.interface'

export enum ConfirmationTypesEnum {
	embedded = 'embedded',
	external = 'external',
	mobile_application = 'mobile_application',
	qr = 'qr',
	redirect = 'redirect'
}

export interface ConfirmationRedirect {
	type: 'redirect'
	confirmation_url: string
	enforce?: boolean
	locale?: LocaleEnum
	return_url: string
}

export interface ConfirmationEmbedded {
	type: ConfirmationTypesEnum.embedded
	locale?: LocaleEnum
}

export interface ConfirmationQR {
	type: ConfirmationTypesEnum.qr
	any: unknown
}

export interface ConfirmationExternal {
	type: ConfirmationTypesEnum.external
	any: unknown
}

export interface ConfirmationMobileApp {
	type: ConfirmationTypesEnum.mobile_application
	any: unknown
}

export type Confirmation =
	| ConfirmationRedirect
	| ConfirmationEmbedded
	| ConfirmationQR
	| ConfirmationExternal
	| ConfirmationMobileApp
