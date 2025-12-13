"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaWebhook = YookassaWebhook;
const common_1 = require("@nestjs/common");
const yookassa_webhook_guard_1 = require("../guards/yookassa-webhook.guard");
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
function YookassaWebhook() {
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(yookassa_webhook_guard_1.YookassaWebhookGuard));
}
