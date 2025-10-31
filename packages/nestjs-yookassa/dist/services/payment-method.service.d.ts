import { HttpService } from '@nestjs/axios';
import { YookassaOptions } from '../interfaces';
import { CreatePaymentMethodRequest, PaymentMethodDetails } from '../interfaces/payment-method.interfaces';
export declare class PaymentMethodService {
    private readonly options;
    private readonly httpService;
    constructor(options: YookassaOptions, httpService: HttpService);
    get(id: string): Promise<PaymentMethodDetails>;
    create(data: CreatePaymentMethodRequest): Promise<PaymentMethodDetails>;
    private getAuthHeader;
}
