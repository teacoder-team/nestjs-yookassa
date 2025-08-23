import type { Amount, LocaleEnum } from './common.interface';
import type { Receipt, Recipient } from './payment-request.interface';
/**
 * Способ доставки счета
 */
export declare enum DeliveryMethodEnum {
    SELF = "self"
}
/**
 * Элемент корзины
 */
export interface CartItem {
    /** Название товара/услуги (1–128 символов) */
    description: string;
    /** Цена единицы */
    price: Amount;
    /** Итоговая цена с учетом скидки */
    discount_price?: Amount;
    /** Количество */
    quantity: number;
}
/**
 * Способ доставки счета
 */
export interface DeliveryMethodData {
    /** Значение способа доставки */
    type: DeliveryMethodEnum;
}
/**
 * Основной объект для создания счета
 */
export interface InvoiceCreateRequest {
    /** Данные о сумме платежа */
    amount: Amount;
    /** Идентификатор субаккаунта */
    gateway_id: string;
    /** Данные для формирования чека */
    receipt?: Receipt;
    /** Информация о получателе платежа */
    recipient?: Recipient;
    /** Сохранение платежного метода для автоплатежей */
    save_payment_method?: boolean;
    /** Автоматический прием платежа */
    capture?: boolean;
    /** IP-адрес пользователя */
    client_ip?: string;
    /** Описание счета */
    description?: string;
    /** Дополнительные метаданные */
    metadata?: Record<string, string>;
    /** Корзина заказа */
    cart: CartItem[];
    /** Данные о способе доставки счета */
    delivery_method_data?: DeliveryMethodData;
    /** Срок действия счета (ISO 8601) */
    expires_at: string;
    /** Язык интерфейса и уведомлений */
    locale?: LocaleEnum;
}
