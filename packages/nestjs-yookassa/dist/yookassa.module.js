"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var YookassaModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.YookassaModule = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const interfaces_1 = require("./interfaces");
const yookassa_service_1 = require("./yookassa.service");
const payment_service_1 = require("./services/payment.service");
const refund_service_1 = require("./services/refund.service");
const services_1 = require("./services");
let YookassaModule = YookassaModule_1 = class YookassaModule {
    /**
     * Метод для регистрации модуля с синхронными параметрами.
     * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
     * @param {YookassaOptions} options - Настройки для конфигурации YooKassa.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * YookassaModule.forRoot({
     *   shopId: 'your_shop_id',
     *   apiKey: 'your_api_key',
     * });
     * ```
     */
    static forRoot(options) {
        return {
            module: YookassaModule_1,
            imports: [axios_1.HttpModule],
            providers: [
                {
                    provide: interfaces_1.YookassaOptionsSymbol,
                    useValue: options
                },
                payment_service_1.PaymentService,
                services_1.InvoiceService,
                refund_service_1.RefundService,
                yookassa_service_1.YookassaService
            ],
            exports: [yookassa_service_1.YookassaService],
            global: true
        };
    }
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     * @param {YookassaAsyncOptions} options - Асинхронные параметры для конфигурации YooKassa.
     * @returns {DynamicModule} Возвращает динамический модуль с необходимыми провайдерами и импортами.
     *
     * @example
     * ```ts
     * YookassaModule.forRootAsync({
     *   imports: [ConfigModule],
     *	  useFactory: async (configService: ConfigService) => ({
     *		 shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
     *		 apiKey: configService.getOrThrow('YOOKASSA_API_KEY')
     *	  }),
     *	  inject: [ConfigService]
     * });
     * ```
     */
    static forRootAsync(options) {
        return {
            module: YookassaModule_1,
            imports: [axios_1.HttpModule, ...(options.imports || [])],
            providers: [
                {
                    provide: interfaces_1.YookassaOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                payment_service_1.PaymentService,
                services_1.InvoiceService,
                refund_service_1.RefundService,
                yookassa_service_1.YookassaService
            ],
            exports: [yookassa_service_1.YookassaService],
            global: true
        };
    }
};
exports.YookassaModule = YookassaModule;
exports.YookassaModule = YookassaModule = YookassaModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], YookassaModule);
