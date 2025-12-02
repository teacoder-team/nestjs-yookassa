"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaHttpClient = void 0;
const yookassa_error_1 = require("./yookassa.error");
const yookassa_constants_1 = require("../config/yookassa.constants");
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../common/interfaces");
const undici_1 = require("undici");
let YookassaHttpClient = class YookassaHttpClient {
    constructor(config) {
        this.config = config;
        if (this.config.proxyUrl) {
            this.dispatcher = new undici_1.ProxyAgent(this.config.proxyUrl);
            console.log('[YooKassa] ProxyAgent enabled:', this.config.proxyUrl);
        }
        else {
            this.dispatcher = undefined;
            console.log('[YooKassa] Proxy not configured, direct connection');
        }
    }
    async request(options) {
        const url = this.buildUrl(options.url, options.params);
        try {
            const res = await (0, undici_1.request)(url, {
                method: options.method,
                dispatcher: this.dispatcher,
                headersTimeout: 15000,
                bodyTimeout: 15000,
                headers: {
                    'Content-Type': 'application/json',
                    'Idempotence-Key': (0, crypto_1.randomUUID)(),
                    Authorization: this.buildAuthHeader()
                },
                body: options.data ? JSON.stringify(options.data) : undefined
            });
            if (res.statusCode >= 400) {
                const text = await res.body.text();
                throw new yookassa_error_1.YookassaError('yookassa_error', text, text);
            }
            return (await res.body.json());
        }
        catch (error) {
            throw new yookassa_error_1.YookassaError((error === null || error === void 0 ? void 0 : error.type) || 'yookassa_error', (error === null || error === void 0 ? void 0 : error.message) || 'Unknown Yookassa error', error);
        }
    }
    get(url, params) {
        return this.request({ method: 'GET', url, params });
    }
    post(url, data) {
        return this.request({ method: 'POST', url, data });
    }
    buildAuthHeader() {
        const creds = Buffer.from(`${this.config.shopId}:${this.config.apiKey}`).toString('base64');
        return `Basic ${creds}`;
    }
    buildUrl(url, params) {
        let full = `${yookassa_constants_1.YOOKASSA_API_URL}${url}`;
        if (params && typeof params === 'object') {
            const qp = new URLSearchParams(params);
            full += `?${qp.toString()}`;
        }
        return full;
    }
};
exports.YookassaHttpClient = YookassaHttpClient;
exports.YookassaHttpClient = YookassaHttpClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object])
], YookassaHttpClient);
