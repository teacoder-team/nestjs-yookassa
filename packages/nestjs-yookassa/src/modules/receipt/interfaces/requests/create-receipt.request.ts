import type { ReceiptItem, Settlement } from '../responses/receipt.response'

export interface Customer {
	full_name?: string
	inn?: string
	email?: string
	phone?: string
}

export interface CreateReceiptRequest {
	customer: Customer
	payment_id: string
	type: 'payment' | 'refund'
	send: boolean
	items: ReceiptItem[]
	settlements: Settlement[]
}
