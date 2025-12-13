/**
 * Проверяет, входит ли IP-адрес в список разрешённых CIDR / IP.
 *
 * Поддерживает:
 *  - IPv4
 *  - IPv6
 *  - одиночные IP
 *  - CIDR-диапазоны
 */
export declare function isIpAllowed(clientIp: string, whitelist: readonly string[]): boolean;
