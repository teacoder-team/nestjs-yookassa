"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachYookassaInterceptors = attachYookassaInterceptors;
function attachYookassaInterceptors(http) {
    http.interceptors.request.use(config => {
        var _a;
        console.log(`[YooKassa Request] → ${(_a = config.method) === null || _a === void 0 ? void 0 : _a.toUpperCase()} ${config.url}`);
        return config;
    });
    http.interceptors.response.use(res => res, async (error) => {
        var _a;
        const status = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.status;
        // Auto retry logic (simple)
        if (status >= 500) {
            console.log('[YooKassa] Retrying request after server error...');
            return await http.request(error.config);
        }
        return Promise.reject(error);
    });
}
