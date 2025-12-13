/**
 * Тип для метаданных ЮКасса.
 *
 * Ограничения ЮКасса:
 * - Максимум 16 ключей
 * - Имя ключа не больше 32 символов
 * - Значение ключа не больше 512 символов
 * - Тип данных — строка в формате UTF-8
 */
export type YookassaMetadata<T extends Record<string, string> = Record<string, string>> = T;
