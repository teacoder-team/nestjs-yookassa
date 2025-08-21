import { type RefundCreateRequest, type RefundDetails, type YookassaOptions } from '../interfaces';
import { HttpService } from '@nestjs/axios';
import { PaymentService } from './payment.service';
export declare class RefundService {
    private readonly options;
    private readonly httpService;
    private readonly paymentService;
    constructor(options: YookassaOptions, httpService: HttpService, paymentService: PaymentService);
    create(refundData: RefundCreateRequest): Promise<RefundDetails>;
    getAll(limit?: number, from?: string, to?: string): Promise<RefundDetails[]>;
    getOne(refundId: string): Promise<RefundDetails>;
    private getAuthHeader;
}
