import type { ReceiptItem, Settlement } from './receipt-details.interface';
export interface Customer {
    full_name?: string;
    inn?: string;
    email?: string;
    phone?: string;
}
export interface ReceiptCreateRequest {
    customer: Customer;
    payment_id: string;
    type: 'payment' | 'refund';
    send: boolean;
    items: ReceiptItem[];
    settlements: Settlement[];
}
