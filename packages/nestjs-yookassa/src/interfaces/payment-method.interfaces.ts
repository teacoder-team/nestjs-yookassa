import { PaymentMethodsEnum } from './payment-method.interface'

export interface CreatePaymentMethodRequest {
	type: PaymentMethodsEnum
	confirmation: {
		type: 'redirect'
		return_url: string
	}
}

export interface PaymentMethodDetails {
	id: string
	type: string
	saved: boolean
	status: string
	confirmation?: {
		type: string
		confirmation_url: string
	}
	card?: {
		first6: string
		last4: string
		expiry_month: string
		expiry_year: string
	}
	metadata?: Record<string, any>
}
