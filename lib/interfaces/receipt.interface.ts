import type { Amount } from './common.interface'

export enum VatCodesEnum {
	'ndsNone' = 1,
	'nds0' = 2,
	'nds10' = 3,
	'nds20' = 4,
	'nds10/110' = 5,
	'nds20/120' = 6
}

export enum TaxSystemCodesEnum {
	'OSN' = 1,
	'USN6' = 2,
	'USN15' = 3,
	'ENVD' = 4,
	'ESN' = 5,
	'PSN' = 6
}

export enum ReceiptRegistrationEnum {
	pending = 'pending',
	succeeded = 'succeeded',
	canceled = 'canceled'
}

export interface Customer {
	full_name?: string
	inn?: string
	email?: string
	phone?: string
}

export interface ReceiptItem {
	description: string
	amount: Amount
	vat_code: VatCodesEnum
	quantity: string
	measure?: string
	mark_quantity?: {
		numerator: number
		denominator: number
	}
}

export interface Receipt {
	customer?: Customer
	items: ReceiptItem[]
	tax_system_code?: TaxSystemCodesEnum
}
