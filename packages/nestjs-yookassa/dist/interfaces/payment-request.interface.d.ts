import type { Amount } from './common.interface';
import type { Confirmation } from './confirmation.interface';
import type { PaymentMethod } from './payment-method.interface';
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
export interface PaymentCreateRequest {
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
    /**
     * Информация о получателе платежа.
     * Необязательное поле.
     */
    recipient?: {
        /**
         * Идентификатор получателя в платежной системе.
         */
        gateway_id: string;
    };
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
    confirmation: Confirmation;
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
