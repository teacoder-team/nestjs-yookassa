import { RefundStatusEnum } from '../../enums';
/**
 * Параметры запроса списка возвратов
 * Соответствуют фильтрам YooKassa Refunds API
 */
export interface GetRefundsRequest {
    /**
     * created_at >= (включительно)
     * ISO 8601
     */
    'created_at.gte'?: string;
    /**
     * created_at > (строго после)
     * ISO 8601
     */
    'created_at.gt'?: string;
    /**
     * created_at <= (включительно)
     * ISO 8601
     */
    'created_at.lte'?: string;
    /**
     * created_at < (строго до)
     * ISO 8601
     */
    'created_at.lt'?: string;
    /**
     * Фильтр по ID платежа (возвраты конкретного платежа)
     */
    payment_id?: string;
    /**
     * Фильтр по статусу возврата:
     * pending — в обработке
     * succeeded — выполнен
     * canceled — отменен
     */
    status?: RefundStatusEnum | string;
    /**
     * Размер страницы (1–100)
     * @default 10
     */
    limit?: number;
    /**
     * Курсор для пагинации (берётся из next_cursor)
     */
    cursor?: string;
}
