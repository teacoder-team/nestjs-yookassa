import type { Amount } from '../../../../common/interfaces/common.interface'
import {
	ReceiptRegistrationEnum,
	TaxSystemCodesEnum,
	VatCodesEnum
} from '../../enums'

export interface ReceiptItem {
	description: string
	quantity: number
	amount: Amount
	vat_code: VatCodesEnum
	payment_mode: string // Вынести в enum
	payment_subject: string // Вынести в enum
	country_of_origin_code?: string
}

export interface Settlement {
	type: 'prepayment' | 'full_payment' | 'advance' | 'credit'
	amount: Amount
}

export interface ReceiptDetails {
	id: string
	type: 'payment' | 'refund'
	payment_id?: string
	refund_id?: string
	status: ReceiptRegistrationEnum
	fiscal_document_number?: string
	fiscal_storage_number?: string
	fiscal_attribute?: string
	registered_at?: string
	fiscal_provider_id?: string
	tax_system_code?: TaxSystemCodesEnum
	items: ReceiptItem[]
	settlements?: Settlement[]
}
