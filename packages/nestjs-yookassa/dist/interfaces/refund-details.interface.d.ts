import { Amount } from './common.interface';
import { ReceiptRegistrationEnum } from './receipt-details.interface';
export declare enum RefundStatusEnum {
    /**
     * Платеж в процессе.
     */
    pending = "pending",
    /**
     * Платеж выполнен успешно.
     */
    succeeded = "succeeded",
    /**
     * Платеж отменен.
     */
    canceled = "canceled"
}
/**
 * Детали отмены платежа.
 */
interface CancellationDetails {
    /**
     * Сторона, инициировавшая отмену.
     */
    party: string;
    /**
     * Причина отмены.
     */
    reason: string;
}
/**
 * Источник, с которого был произведен возврат.
 */
interface Source {
    /**
     * Идентификатор счета.
     */
    account_id: string;
    /**
     * Сумма возврата.
     */
    amount: Amount;
}
/**
 * Сумма, удержанная в качестве комиссии платформы.
 */
interface PlatformFeeAmount {
    /**
     * Значение комиссии.
     */
    value: string;
    /**
     * Валюта комиссии.
     */
    currency: string;
}
/**
 * Сделка, для которой был выполнен возврат.
 */
interface Deal {
    /**
     * Идентификатор сделки.
     */
    id: string;
}
/**
 * Метод возврата средств.
 */
export interface RefundMethod {
    /**
     * Тип метода возврата.
     */
    type: string;
    /**
     * Идентификатор операции в системе SBP (для специфичных методов).
     * Необязательное поле.
     */
    sbp_operation_id?: string;
}
export interface RefundDetails {
    /**
     * Идентификатор возврата.
     */
    id: string;
    /**
     * Статус возврата.
     */
    status: RefundStatusEnum;
    /**
     * Детали отмены, если возврат был отменен.
     * Необязательное поле.
     */
    cancellation_details?: CancellationDetails;
    /**
     * Регистрируется ли чек при возврате.
     * Необязательное поле.
     */
    receipt_registration?: ReceiptRegistrationEnum;
    /**
     * Время создания возврата.
     */
    created_at: string;
    /**
     * Сумма возврата.
     */
    amount: Amount;
    /**
     * Описание возврата.
     * Необязательное поле.
     */
    description?: string;
    /**
     * Источники, из которых поступили средства для возврата.
     * Необязательное поле.
     */
    sources?: Source[];
    /**
     * Платежная комиссия, удержанная платформой.
     * Необязательное поле.
     */
    platform_fee_amount?: PlatformFeeAmount;
    /**
     * Информация о сделке, связанной с возвратом.
     * Необязательное поле.
     */
    deal?: Deal;
    /**
     * Способ возврата.
     * Необязательное поле.
     */
    refund_method?: RefundMethod;
}
export {};
