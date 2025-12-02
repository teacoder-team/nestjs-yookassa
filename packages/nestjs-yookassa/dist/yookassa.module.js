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
const common_1 = require("@nestjs/common");
const yookassa_service_1 = require("./yookassa.service");
const payment_module_1 = require("./modules/payment/payment.module");
const refund_module_1 = require("./modules/refund/refund.module");
const yookassa_http_client_1 = require("./core/http/yookassa.http-client");
const interfaces_1 = require("./common/interfaces");
const invoice_module_1 = require("./modules/invoice/invoice.module");
const payment_method_module_1 = require("./modules/payment-method/payment-method.module");
let YookassaModule = YookassaModule_1 = class YookassaModule {
    /**
     * Метод для регистрации модуля с синхронными параметрами.
     * Этот метод используется для конфигурации модуля с заранее заданными параметрами.
     * @param {YookassaModuleOptions} options - Настройки для конфигурации YooKassa.
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
            imports: [
                payment_module_1.PaymentModule,
                refund_module_1.RefundModule,
                invoice_module_1.InvoiceModule,
                payment_method_module_1.PaymentMethodModule
            ],
            providers: [
                { provide: interfaces_1.YookassaOptionsSymbol, useValue: options },
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                yookassa_service_1.YookassaService
            ],
            exports: [yookassa_service_1.YookassaService, yookassa_http_client_1.YookassaHttpClient],
            global: true
        };
    }
    /**
     * Метод для регистрации модуля с асинхронной конфигурацией.
     * Этот метод используется для конфигурации модуля с параметрами, которые будут переданы через фабричную функцию.
     * @param {YookassaModuleAsyncOptions} options - Асинхронные параметры для конфигурации YooKassa.
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
            imports: [
                ...(options.imports || []),
                payment_module_1.PaymentModule,
                refund_module_1.RefundModule,
                invoice_module_1.InvoiceModule,
                payment_method_module_1.PaymentMethodModule
            ],
            providers: [
                {
                    provide: interfaces_1.YookassaOptionsSymbol,
                    useFactory: options.useFactory,
                    inject: options.inject || []
                },
                {
                    provide: yookassa_http_client_1.YookassaHttpClient,
                    useFactory: (cfg) => new yookassa_http_client_1.YookassaHttpClient(cfg),
                    inject: [interfaces_1.YookassaOptionsSymbol]
                },
                yookassa_service_1.YookassaService
            ],
            exports: [yookassa_service_1.YookassaService, yookassa_http_client_1.YookassaHttpClient],
            global: true
        };
    }
};
exports.YookassaModule = YookassaModule;
exports.YookassaModule = YookassaModule = YookassaModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], YookassaModule);
