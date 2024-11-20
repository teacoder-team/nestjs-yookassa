import type { Amount } from './common.interface'
import type { Confirmation } from './confirmation.interface'
import type { PaymentMethod } from './payment-method.interface'
import type { Receipt } from './receipt.interface'

export interface PaymentCreateRequest {
	amount: Amount
	description?: string
	receipt?: Receipt
	recipient?: {
		gateway_id: string
	}
	payment_method_data?: PaymentMethod
	capture: boolean
	confirmation: Confirmation
	save_payment_method?: boolean
	merchant_customer_id?: string
}
