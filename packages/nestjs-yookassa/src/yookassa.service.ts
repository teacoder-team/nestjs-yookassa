import { Injectable } from '@nestjs/common'
import { RefundService } from './modules/refund/refund.service'
import { InvoiceService } from './modules/invoice/invoice.service'
import { PaymentMethodService } from './modules/payment-method/payment-method.service'
import { PaymentService } from './modules/payment/payment.service'

@Injectable()
export class YookassaService {
	public constructor(
		public payments: PaymentService,
		public paymentMethods: PaymentMethodService,
		public invoices: InvoiceService,
		public refunds: RefundService
	) {}
}
