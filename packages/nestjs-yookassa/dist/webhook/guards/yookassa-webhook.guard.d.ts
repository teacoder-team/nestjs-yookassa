import { type CanActivate, type ExecutionContext } from '@nestjs/common';
export declare class YookassaWebhookGuard implements CanActivate {
    private readonly logger;
    canActivate(context: ExecutionContext): boolean;
    private extractClientIp;
}
