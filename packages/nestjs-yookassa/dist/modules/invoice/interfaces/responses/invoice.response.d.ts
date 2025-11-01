import type { Payment } from '../../../payment/interfaces';
import type { InvoiceCancellationPartyEnum, InvoiceCancellationReasonEnum, InvoiceStatusEnum } from '../../enums';
import type { CartItem } from '../requests';
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
export interface Invoice {
    /** Идентификатор счета в ЮKassa */
    id: string;
    /** Статус счета */
    status: InvoiceStatusEnum;
    /** Корзина заказа */
    cart: CartItem[];
    /** Данные о выбранном способе доставки счета */
    delivery_method?: DeliveryMethod;
    /** Данные о платеже по счету (если успешно оплачен) */
    payment_details?: Payment;
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
