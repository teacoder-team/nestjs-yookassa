import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
export declare const YookassaOptionsSymbol: unique symbol;
/**
 * Настройки модуля YooKassa.
 */
export type YookassaModuleOptions = {
    /**
     * Идентификатор магазина YooKassa.
     */
    shopId: string;
    /**
     * Секретный ключ API.
     */
    apiKey: string;
    proxyUrl?: string;
};
/**
 * Асинхронная конфигурация модуля.
 */
export type YookassaModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<YookassaModuleOptions>, 'useFactory' | 'inject'>;
