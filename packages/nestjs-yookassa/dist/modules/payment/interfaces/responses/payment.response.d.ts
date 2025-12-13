import { Amount } from '../../../../common/interfaces';
import { PaymentStatusEnum } from '../../enums';
import { PaymentMethod } from '../payment-method.interface';
import { Recipient } from '../requests/create-payment.request';
import { ConfirmationResponse } from './confirmation.response';
import type { YookassaMetadata } from '../../../../common/types/metadata.type';
/**
 * Ответ объекта платежа.
 */
export interface Payment<T extends YookassaMetadata = YookassaMetadata> {
    id: string;
    status: PaymentStatusEnum;
    amount: Amount;
    description?: string;
    paid?: boolean;
    captured_at?: string;
    created_at: string;
    expires_at?: string;
    payment_method?: PaymentMethod<T>;
    confirmation?: ConfirmationResponse;
    recipient?: Recipient;
    refundable?: boolean;
    receipt_registration?: boolean | string;
    income_amount?: Amount;
    refunded_amount?: Amount;
    metadata?: T;
    test?: boolean;
    save_payment_method?: boolean;
}
