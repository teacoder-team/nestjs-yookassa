import type { Amount } from './common.interface'
import type { Confirmation } from './confirmation.interface'
import type { PaymentMethod } from './payment-method.interface'
import type { ReceiptRegistrationEnum } from './receipt.interface'

export enum PaymentStatusEnum {
	PENDING = 'pending',
	WAITING_FOR_CAPTURE = 'waiting_for_capture',
	SUCCEEDED = 'succeeded',
	CANCELED = 'canceled'
}

export interface PaymentDetails {
	id: string
	status: PaymentStatusEnum
	amount: Amount
	income_amount?: Amount
	description?: string
	recipient: {
		account_id: string
		gateway_id: string
	}
	payment_method?: PaymentMethod
	captured_at?: string
	created_at: string
	expires_at?: string
	confirmation?: Confirmation
	test: boolean
	refunded_amount?: Amount
	paid: boolean
	refundable: boolean
	receipt_registration?: ReceiptRegistrationEnum
	metadata?: object
}
