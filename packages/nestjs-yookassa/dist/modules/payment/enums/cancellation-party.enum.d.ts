/**
 * Инициаторы отмены платежа.
 */
export declare enum CancellationPartyEnum {
    /**
     * Продавец товаров и услуг (вы).
     */
    MERCHANT = "merchant",
    /**
     * ЮKassa.
     */
    YOO_MONEY = "yoo_money",
    /**
     * Любые участники процесса платежа, кроме ЮKassa и продавца
     * (например, эмитент, сторонний платежный сервис).
     */
    PAYMENT_NETWORK = "payment_network"
}
