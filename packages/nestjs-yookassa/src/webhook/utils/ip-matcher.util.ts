import CidrMatcher from 'cidr-matcher'

const matcher = new CidrMatcher()

/**
 * Проверяет, входит ли IP-адрес в список разрешённых CIDR / IP.
 *
 * Поддерживает:
 *  - IPv4
 *  - IPv6
 *  - одиночные IP
 *  - CIDR-диапазоны
 */
export function isIpAllowed(
	clientIp: string,
	whitelist: readonly string[]
): boolean {
	if (!clientIp) return false

	try {
		return matcher.match(clientIp, whitelist as string[])
	} catch {
		return false
	}
}
