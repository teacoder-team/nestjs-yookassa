import { Injectable } from '@nestjs/common'
import type {
	CreatePaymentMethodRequest,
	CreatePaymentMethodResponse,
	PaymentMethod
} from './interfaces'
import { YookassaHttpClient } from '../../core/http/yookassa.http-client'

@Injectable()
export class PaymentMethodService {
	public constructor(private readonly http: YookassaHttpClient) {}

	/**
	 * Создает сохраненный способ оплаты (payment method).
	 *
	 * Используется для привязки карты клиента или другого способа оплаты.
	 * Требует подтверждения пользователя (redirect confirmation flow).
	 *
	 * @param {CreatePaymentMethodRequest} data — Данные для создания метода оплаты.
	 * @returns {Promise<CreatePaymentMethodResponse>} Детали созданного payment method.
	 *
	 * @example Создание сохраненного метода оплаты
	 * ```ts
	 * const method = await this.yookassaService.paymentMethods.create({
	 *   type: PaymentMethodsEnum.BANK_CARD,
	 *   confirmation: {
	 *     type: 'redirect',
	 *     return_url: 'https://myshop.com/yookassa-return'
	 *   }
	 * });
	 *
	 * console.log(method.id, method.status, method.confirmation?.confirmation_url);
	 * ```
	 *
	 * @example Подключение карты с редиректом
	 * ```ts
	 * const res = await yookassa.paymentMethods.create({
	 *   type: PaymentMethodsEnum.BANK_CARD,
	 *   confirmation: {
	 *     type: 'redirect',
	 *     return_url: 'https://example.com/success'
	 *   }
	 * });
	 *
	 * return { redirectUrl: res.confirmation.confirmation_url };
	 * ```
	 *
	 * @see https://yookassa.ru/developers/api#create_payment_method
	 */
	public async create(
		data: CreatePaymentMethodRequest
	): Promise<CreatePaymentMethodResponse> {
		return this.http.post('/payment_methods', data)
	}

	/**
	 * Получает сохраненный способ оплаты по ID.
	 *
	 * @param {string} id — Идентификатор способа оплаты.
	 * @returns {Promise<PaymentMethod>} Объект с деталями метода оплаты.
	 *
	 * @example
	 * ```ts
	 * const paymentMethod = await this.yookassaService.paymentMethods.getById('pm_123');
	 * console.log(paymentMethod.status, paymentMethod.card?.last4);
	 * ```
	 *
	 * @see https://yookassa.ru/developers/api#get_payment_method
	 */
	public async getById(id: string): Promise<PaymentMethod> {
		return this.http.get(`/payment_methods/${id}`)
	}
}
