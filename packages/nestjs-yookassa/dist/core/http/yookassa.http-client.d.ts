import { HttpService } from '@nestjs/axios';
import { type YookassaModuleOptions } from '../../common/interfaces';
export declare class YookassaHttpClient {
    private readonly config;
    private readonly httpService;
    private readonly dispatcher;
    constructor(config: YookassaModuleOptions, httpService: HttpService);
    request<T = any>(options: {
        method: string;
        url: string;
        data?: any;
        params?: any;
    }): Promise<T>;
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
    private buildAuthHeader;
    private buildUrl;
    private extractProxyFromAgent;
}
