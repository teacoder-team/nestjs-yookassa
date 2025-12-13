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
export declare function YookassaWebhook(): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
