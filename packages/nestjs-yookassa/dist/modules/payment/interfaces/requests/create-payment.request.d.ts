import type { Amount } from '../../../../common/interfaces';
import type { TaxSystemCodesEnum, VatCodesEnum } from '../../../receipt/enums';
import type { Customer } from '../../../receipt/interfaces/requests';
import type { PaymentMethod } from '../payment-method.interface';
import type { ConfirmationRequest } from './confirmation.request';
/**
 * Данные о получателе платежа
 */
export interface Recipient {
    /** Идентификатор получателя в платежной системе */
    gateway_id: string;
}
/**
 * Дробное количество маркированного товара (mark_quantity).
 */
export interface MarkQuantity {
    /** Числитель — продаваемое количество. */
    numerator: number;
    /** Знаменатель — общее количество в упаковке. */
    denominator: number;
}
/**
 * Товар/услуга в чеке.
 */
interface ReceiptItem {
    /** Название товара (1–128 символов). */
    description: string;
    /** Цена единицы товара. */
    amount: Amount;
    /** Количество товара. */
    quantity: number;
    /** Ставка НДС. Для самозанятых всегда 1. */
    vat_code: VatCodesEnum;
    /** Мера количества (тег 2108, напр. "piece"). */
    measure?: string;
    /** Дробное количество маркированного товара. */
    mark_quantity?: MarkQuantity;
    /** Признак предмета расчета (товар, услуга и т.д.). */
    payment_subject?: string;
    /** Признак способа расчета (full_payment и т.п.). */
    payment_mode?: string;
    /** Код страны происхождения (ISO 3166-1 alpha-2). */
    country_of_origin_code?: string;
    /** Номер таможенной декларации. */
    customs_declaration_number?: string;
    /** Сумма акциза. */
    excise?: string;
    /** Код товара (hex, макс 32 байта). */
    product_code?: string;
    /** Информация о коде маркировки. */
    mark_code_info?: object;
    /** Режим обработки кода маркировки (обычно "0"). */
    mark_mode?: string;
    /** Отраслевой реквизит предмета расчета. */
    payment_subject_industry_details?: object[];
}
/**
 * Данные для формирования чека.
 */
export interface Receipt {
    /** Данные о пользователе (email или phone обязательны). */
    customer?: Customer;
    /** Список товаров (обязателен). */
    items: ReceiptItem[];
    /** Код системы налогообложения (если нужно). */
    tax_system_code?: TaxSystemCodesEnum;
}
/**
 * Информация о пассажире авиабилета
 */
export interface AirlinePassenger {
    /**
     * Имя пассажира. Используются только латинские буквы, например SERGEI.
     */
    first_name: string;
    /**
     * Фамилия пассажира. Используются только латинские буквы, например IVANOV.
     */
    last_name: string;
}
/**
 * Информация о перелёте
 */
export interface AirlineLeg {
    /**
     * Код аэропорта вылета по справочнику IATA, например LED.
     */
    departure_airport: string;
    /**
     * Код аэропорта прибытия по справочнику IATA, например AMS.
     */
    destination_airport: string;
    /**
     * Дата вылета в формате YYYY-MM-DD (ISO 8601).
     */
    departure_date: string;
    /**
     * Код авиакомпании по справочнику IATA. Необязательное поле.
     */
    carrier_code?: string;
}
/**
 * Объект с данными для продажи авиабилетов.
 * Используется только для платежей банковской картой.
 */
export interface AirlineInfo {
    /**
     * Уникальный номер билета. Обязателен, если известен при создании платежа.
     */
    ticket_number?: string;
    /**
     * Номер бронирования. Обязателен, если не передан ticket_number.
     */
    booking_reference?: string;
    /**
     * Список пассажиров. Необязательное поле.
     */
    passengers?: AirlinePassenger[];
    /**
     * Список перелётов. Необязательное поле.
     */
    legs?: AirlineLeg[];
}
/**
 * Тип, представляющий запрос на создание платежа.
 */
export interface CreatePaymentRequest {
    /**
     * Сумма платежа.
     */
    amount: Amount;
    /**
     * Описание платежа.
     * Необязательное поле.
     */
    description?: string;
    /**
     * Чек, который будет прикреплен к платежу.
     * Необязательное поле.
     */
    receipt?: {
        customer: Customer;
        items: ReceiptItem[];
    };
    /**
     * Информация о получателе платежа.
     * Необязательное поле.
     */
    recipient?: Recipient;
    /**
     * Одноразовый токен для проведения оплаты, сформированный с помощью Checkout.js или мобильного SDK
     * Необязательное поле.
     */
    payment_token?: string;
    /**
     * Идентификатор сохраненного способа оплаты
     * Необязательное поле.
     */
    payment_method_id?: string;
    /**
     * Метод платежа.
     * Необязательное поле.
     */
    payment_method_data?: PaymentMethod;
    /**
     * Тип подтверждения для платежа.
     */
    confirmation?: ConfirmationRequest;
    /**
     * Нужно ли сохранять метод платежа для будущих платежей.
     * Необязательное поле.
     */
    save_payment_method?: boolean;
    /**
     * Указывает, следует ли сразу захватывать платеж.
     * Необязательное поле, по умолчанию false.
     */
    capture?: boolean;
    /**
     * IPv4 или IPv6-адрес пользователя.
     */
    client_ip?: string;
    /**
     * Дополнительные метаданные, связанные с платежом.
     * Необязательное поле.
     */
    metadata?: object;
    /**
     * Объект с данными для продажи авиабилетов.
     * Используется только для платежей банковской картой.
     * Необязательное поле.
     */
    airline?: AirlineInfo;
    /**
     * Идентификатор клиента в системе продавца.
     * Необязательное поле.
     */
    merchant_customer_id?: string;
}
export {};
