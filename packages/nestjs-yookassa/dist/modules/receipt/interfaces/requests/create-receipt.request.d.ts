import type { ReceiptItem, Settlement } from '../responses/receipt.response';
/**
 * Данные о пользователе (customer).
 */
export interface Customer {
    /** ФИО или название организации (если ИП/юрлицо). */
    full_name?: string;
    /** ИНН (10 или 12 цифр). */
    inn?: string;
    /** Email для отправки чека (обязателен, если нет phone). */
    email?: string;
    /** Телефон для отправки чека (в формате E.164, напр. 79001234567). */
    phone?: string;
}
export interface CreateReceiptRequest {
    customer: Customer;
    payment_id: string;
    type: 'payment' | 'refund';
    send: boolean;
    items: ReceiptItem[];
    settlements: Settlement[];
}
