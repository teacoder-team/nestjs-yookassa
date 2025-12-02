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
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const yookassa_error_1 = require("./yookassa.error");
const yookassa_constants_1 = require("../config/yookassa.constants");
const crypto_1 = require("crypto");
const common_1 = require("@nestjs/common");
const interfaces_1 = require("../../common/interfaces");
let YookassaHttpClient = class YookassaHttpClient {
    constructor(config, httpService) {
        var _a;
        this.config = config;
        this.httpService = httpService;
        const client = this.httpService.axiosRef;
        client.defaults.baseURL = yookassa_constants_1.YOOKASSA_API_URL;
        client.defaults.timeout = 15000;
        client.defaults.auth = {
            username: this.config.shopId,
            password: this.config.apiKey
        };
        client.defaults.headers.common['Content-Type'] = 'application/json';
        if (this.config.proxy) {
            client.defaults.proxy = {
                host: this.config.proxy.host,
                port: this.config.proxy.port,
                protocol: (_a = this.config.proxy.protocol) !== null && _a !== void 0 ? _a : 'http',
                auth: this.config.proxy.auth
            };
            console.log(`[YooKassa] Proxy enabled → ${this.config.proxy.host}:${this.config.proxy.port}`);
        }
    }
    async request(options) {
        var _a, _b, _c, _d, _e;
        try {
            options.headers = Object.assign(Object.assign({}, options.headers), { 'Idempotence-Key': (0, crypto_1.randomUUID)() });
            const res = await (0, rxjs_1.firstValueFrom)(this.httpService.request(options));
            return res.data;
        }
        catch (error) {
            throw new yookassa_error_1.YookassaError(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.type) || 'yookassa_error', ((_d = (_c = error === null || error === void 0 ? void 0 : error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.description) || error.message, (_e = error === null || error === void 0 ? void 0 : error.response) === null || _e === void 0 ? void 0 : _e.data);
        }
    }
    get(url, params) {
        return this.request({ method: 'GET', url, params });
    }
    post(url, data) {
        return this.request({ method: 'POST', url, data });
    }
};
exports.YookassaHttpClient = YookassaHttpClient;
exports.YookassaHttpClient = YookassaHttpClient = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(interfaces_1.YookassaOptionsSymbol)),
    __metadata("design:paramtypes", [Object, axios_1.HttpService])
], YookassaHttpClient);
