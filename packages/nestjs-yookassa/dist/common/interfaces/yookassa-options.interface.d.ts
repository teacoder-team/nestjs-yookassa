import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';
export declare const YookassaOptionsSymbol: unique symbol;
/**
 * Тип, представляющий параметры для настройки YooKassa.
 */
export type YookassaModuleOptions = {
    /**
     * Идентификатор магазина в YooKassa.
     */
    shopId: string;
    /**
     * Ключ API для аутентификации в YooKassa.
     */
    apiKey: string;
};
/**
 * Тип для асинхронной настройки YooKassa.
 */
export type YookassaModuleAsyncOptions = Pick<ModuleMetadata, 'imports'> & Pick<FactoryProvider<YookassaModuleOptions>, 'useFactory' | 'inject'>;
