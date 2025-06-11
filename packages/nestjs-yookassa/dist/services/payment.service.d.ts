import { type PaymentCreateRequest, type PaymentDetails, type YookassaOptions } from '../interfaces';
import { HttpService } from '@nestjs/axios';
export declare class PaymentService {
    private readonly options;
    private readonly httpService;
    constructor(options: YookassaOptions, httpService: HttpService);
    create(paymentData: PaymentCreateRequest): Promise<PaymentDetails>;
    getAll(limit?: number, from?: string, to?: string): Promise<PaymentDetails[]>;
    getOne(paymentId: string): Promise<PaymentDetails>;
    capture(paymentId: string): Promise<PaymentDetails>;
    cancel(paymentId: string): Promise<PaymentDetails>;
    private getAuthHeader;
}
