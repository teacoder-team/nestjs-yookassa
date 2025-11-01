import type { PaymentMethodStatusEnum } from '../../enums';
interface PaymentMethodCardProduct {
    code: string;
    name?: string;
}
interface PaymentMethodCard {
    first6?: string;
    last4: string;
    expiry_year: string;
    expiry_month: string;
    card_type: string;
    card_product?: PaymentMethodCardProduct;
    issuer_country?: string;
    issuer_name?: string;
    source?: 'mir_pay' | 'apple_pay' | 'google_pay' | string;
}
interface PaymentMethodHolder {
    account_id: string;
    gateway_id?: string;
}
interface PaymentMethodConfirmation {
    type: 'redirect';
    confirmation_url: string;
    enforce?: boolean;
    return_url?: string;
}
export interface PaymentMethodDetails {
    id: string;
    type: 'bank_card';
    saved: boolean;
    status: PaymentMethodStatusEnum;
    holder: PaymentMethodHolder;
    card?: PaymentMethodCard;
    title?: string;
    confirmation?: PaymentMethodConfirmation;
}
export {};
