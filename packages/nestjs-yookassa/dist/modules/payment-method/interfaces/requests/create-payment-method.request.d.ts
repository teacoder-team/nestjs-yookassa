import type { PaymentMethodsEnum } from '../../../payment/enums';
export interface CreatePaymentMethodRequest {
    type: PaymentMethodsEnum;
    confirmation: {
        type: 'redirect';
        return_url: string;
    };
}
