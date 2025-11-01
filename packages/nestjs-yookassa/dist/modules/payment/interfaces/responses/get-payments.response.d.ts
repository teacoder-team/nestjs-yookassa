import type { Payment } from './payment.response';
/**
 * Ответ API YooKassa на запрос списка платежей
 */
export interface GetPaymentsResponse {
    /**
     * Тип ответа — всегда 'list'
     */
    type: 'list';
    /**
     * Список платежей
     */
    items: Payment[];
    /**
     * Курсор следующей страницы
     * Если отсутствует — значит данных больше нет
     */
    next_cursor?: string;
}
