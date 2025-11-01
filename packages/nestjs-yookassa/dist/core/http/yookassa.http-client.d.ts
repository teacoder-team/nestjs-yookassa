import { HttpService } from '@nestjs/axios';
import type { AxiosRequestConfig } from 'axios';
import { type YookassaModuleOptions } from '../../common/interfaces';
export declare class YookassaHttpClient {
    private readonly config;
    private readonly httpService;
    constructor(config: YookassaModuleOptions, httpService: HttpService);
    request<T = any>(options: AxiosRequestConfig): Promise<T>;
    get<T>(url: string, params?: any): Promise<T>;
    post<T>(url: string, data?: any): Promise<T>;
}
