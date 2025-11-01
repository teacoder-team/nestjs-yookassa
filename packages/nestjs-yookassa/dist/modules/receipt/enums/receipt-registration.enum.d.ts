/**
 * Перечисление состояний регистрации чека.
 * @enum {string}
 */
export declare enum ReceiptRegistrationEnum {
    /**
     * Ожидает регистрации
     */
    PENDING = "pending",
    /**
     * Успешно зарегистрирован
     */
    SUCCEEDED = "succeeded",
    /**
     * Регистрация отменена
     */
    CANCELED = "canceled"
}
