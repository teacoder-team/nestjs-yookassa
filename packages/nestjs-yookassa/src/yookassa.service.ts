import { Injectable } from '@nestjs/common'
import { PaymentService } from './services/payment.service'
import { RefundService } from './services/refund.service'
import { PaymentCreateRequest, RefundCreateRequest } from './interfaces'

@Injectable()
export class YookassaService {
	public constructor(
		private readonly paymentService: PaymentService,
		private readonly refundService: RefundService
	) {}

	// Payment API
	createPayment(paymentData: PaymentCreateRequest) {
		return this.paymentService.create(paymentData)
	}

	getPayments(limit?: number, from?: string, to?: string) {
		return this.paymentService.getAll(limit, from, to)
	}

	getPaymentDetails(paymentId: string) {
		return this.paymentService.getOne(paymentId)
	}

	capturePayment(paymentId: string) {
		return this.paymentService.capture(paymentId)
	}

	cancelPayment(paymentId: string) {
		return this.paymentService.cancel(paymentId)
	}

	// Refund API
	createRefund(refundData: RefundCreateRequest) {
		return this.refundService.create(refundData)
	}

	getRefunds(limit?: number, from?: string, to?: string) {
		return this.refundService.getAll(limit, from, to)
	}

	getRefundDetails(refundId: string) {
		return this.refundService.getOne(refundId)
	}
}
