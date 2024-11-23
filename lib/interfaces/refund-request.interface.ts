import { Amount } from './common.interface'

export interface RefundCreateRequest {
	payment_id: string
	amount: Amount
	description?: string
}
