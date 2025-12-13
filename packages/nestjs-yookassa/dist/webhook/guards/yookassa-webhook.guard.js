"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YookassaWebhookGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaWebhookGuard = void 0;
const common_1 = require("@nestjs/common");
const yookassa_ip_whitelist_1 = require("../constants/yookassa-ip-whitelist");
const ip_matcher_util_1 = require("../utils/ip-matcher.util");
let YookassaWebhookGuard = YookassaWebhookGuard_1 = class YookassaWebhookGuard {
    constructor() {
        this.logger = new common_1.Logger(YookassaWebhookGuard_1.name);
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const clientIp = this.extractClientIp(request);
        if (!(0, ip_matcher_util_1.isIpAllowed)(clientIp, yookassa_ip_whitelist_1.YOOKASSA_IP_WHITELIST)) {
            this.logger.warn(`Blocked webhook request from unauthorized IP: ${clientIp}`);
            throw new common_1.ForbiddenException('Webhook request is not from YooKassa');
        }
        return true;
    }
    extractClientIp(req) {
        var _a;
        const xff = req.headers['x-forwarded-for'];
        if (typeof xff === 'string')
            return xff.split(',')[0].trim();
        return (_a = req.socket.remoteAddress) !== null && _a !== void 0 ? _a : '';
    }
};
exports.YookassaWebhookGuard = YookassaWebhookGuard;
exports.YookassaWebhookGuard = YookassaWebhookGuard = YookassaWebhookGuard_1 = __decorate([
    (0, common_1.Injectable)()
], YookassaWebhookGuard);
