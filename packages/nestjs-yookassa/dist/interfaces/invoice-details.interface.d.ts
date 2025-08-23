import { CartItem } from './invoice-request.interface';
import type { PaymentDetails } from './payment-details.interface';
/**
 * Статусы счета
 */
export declare enum InvoiceStatusEnum {
    /** Счет создан и ожидает оплаты */
    PENDING = "pending",
    /** Счет успешно оплачен */
    SUCCEEDED = "succeeded",
    /** Счет отменен или истек */
    CANCELED = "canceled"
}
/**
 * Способ доставки счета
 */
export interface DeliveryMethod {
    /** Тип способа доставки */
    type: 'self';
    /** URL страницы счета для оплаты */
    url?: string;
}
/**
 * Инициаторы отмены счета
 */
export declare enum InvoiceCancellationPartyEnum {
    MERCHANT = "merchant",
    YOO_MONEY = "yoo_money"
}
/**
 * Причины отмены счета
 */
export declare enum InvoiceCancellationReasonEnum {
    INVOICE_CANCELED = "invoice_canceled",
    INVOICE_EXPIRED = "invoice_expired",
    GENERAL_DECLINE = "general_decline",
    PAYMENT_CANCELED = "payment_canceled",
    PAYMENT_EXPIRED_ON_CAPTURE = "payment_expired_on_capture"
}
/**
 * Детали отмены счета
 */
export interface InvoiceCancellationDetails {
    /** Участник процесса, который отменил счет */
    party: InvoiceCancellationPartyEnum;
    /** Причина отмены счета */
    reason: InvoiceCancellationReasonEnum;
}
/**
 * Детали счета
 */
export interface InvoiceDetails {
    /** Идентификатор счета в ЮKassa */
    id: string;
    /** Статус счета */
    status: InvoiceStatusEnum;
    /** Корзина заказа */
    cart: CartItem[];
    /** Данные о выбранном способе доставки счета */
    delivery_method?: DeliveryMethod;
    /** Данные о платеже по счету (если успешно оплачен) */
    payment_details?: PaymentDetails;
    /** Дата и время создания счета (ISO 8601) */
    created_at: string;
    /** Срок действия счета (ISO 8601), для счетов pending */
    expires_at?: string;
    /** Описание счета, видимое пользователю */
    description?: string;
    /** Детали отмены счета */
    cancellation_details?: InvoiceCancellationDetails;
    /** Дополнительные метаданные (ключ-значение) */
    metadata?: Record<string, string>;
}
