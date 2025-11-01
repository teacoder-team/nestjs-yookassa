import { RefundService } from './modules/refund/refund.service';
import { InvoiceService } from './modules/invoice/invoice.service';
import { PaymentMethodService } from './modules/payment-method/payment-method.service';
import { PaymentService } from './modules/payment/payment.service';
export declare class YookassaService {
    payments: PaymentService;
    paymentMethods: PaymentMethodService;
    invoices: InvoiceService;
    refunds: RefundService;
    constructor(payments: PaymentService, paymentMethods: PaymentMethodService, invoices: InvoiceService, refunds: RefundService);
}
