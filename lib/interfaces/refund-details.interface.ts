import { Amount } from './common.interface'
import { ReceiptRegistrationEnum } from './receipt-details.interface'

export enum RefundStatusEnum {
	pending = 'pending',
	succeeded = 'succeeded',
	canceled = 'canceled'
}

export interface CancellationDetails {
	party: string
	reason: string
}

export interface Source {
	account_id: string
	amount: Amount
}

export interface PlatformFeeAmount {
	value: string
	currency: string
}

export interface Deal {
	id: string
}

export interface RefundSettlement {
	type: string
	amount: Amount
}

export interface RefundMethod {
	type: string
	sbp_operation_id?: string
}

export interface RefundDetails {
	id: string
	status: RefundStatusEnum
	cancellation_details?: CancellationDetails
	receipt_registration?: ReceiptRegistrationEnum
	created_at: string
	amount: Amount
	description?: string
	sources?: Source[]
	platform_fee_amount?: PlatformFeeAmount
	deal?: Deal
	refund_settlements: RefundSettlement[]
	refund_method?: RefundMethod
}
