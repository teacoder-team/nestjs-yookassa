import { applyDecorators, UseGuards } from '@nestjs/common'
import { YookassaWebhookGuard } from '../guards/yookassa-webhook.guard'

/**
 * Защищает эндпоинт как webhook YooKassa.
 *
 * Проверяет:
 *  - IP-адрес отправителя (официальный whitelist YooKassa)
 *
 * @example
 * ```ts
 * @Post('yookassa')
 * @YookassaWebhook()
 * handleWebhook(@Body() payload: any) {}
 * ```
 */
export function YookassaWebhook() {
	return applyDecorators(UseGuards(YookassaWebhookGuard))
}
