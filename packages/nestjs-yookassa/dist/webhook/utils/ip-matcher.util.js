"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIpAllowed = isIpAllowed;
const cidr_matcher_1 = require("cidr-matcher");
const matcher = new cidr_matcher_1.default();
/**
 * Проверяет, входит ли IP-адрес в список разрешённых CIDR / IP.
 *
 * Поддерживает:
 *  - IPv4
 *  - IPv6
 *  - одиночные IP
 *  - CIDR-диапазоны
 */
function isIpAllowed(clientIp, whitelist) {
    if (!clientIp)
        return false;
    try {
        return matcher.match(clientIp, whitelist);
    }
    catch (_a) {
        return false;
    }
}
