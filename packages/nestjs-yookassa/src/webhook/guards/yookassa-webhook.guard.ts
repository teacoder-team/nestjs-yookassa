import {
	type CanActivate,
	type ExecutionContext,
	ForbiddenException,
	Injectable,
	Logger
} from '@nestjs/common'
import type { Request } from 'express'
import { YOOKASSA_IP_WHITELIST } from '../constants/yookassa-ip-whitelist'
import { isIpAllowed } from '../utils/ip-matcher.util'

@Injectable()
export class YookassaWebhookGuard implements CanActivate {
	private readonly logger = new Logger(YookassaWebhookGuard.name)

	public canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<Request>()

		const clientIp = this.extractClientIp(request)

		if (!isIpAllowed(clientIp, YOOKASSA_IP_WHITELIST)) {
			this.logger.warn(
				`Blocked webhook request from unauthorized IP: ${clientIp}`
			)

			throw new ForbiddenException('Webhook request is not from YooKassa')
		}

		return true
	}

	private extractClientIp(req: Request): string {
		const xff = req.headers['x-forwarded-for']

		if (typeof xff === 'string') return xff.split(',')[0].trim()

		return req.socket.remoteAddress ?? ''
	}
}
