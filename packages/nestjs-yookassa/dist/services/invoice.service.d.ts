import { type InvoiceCreateRequest, type InvoiceDetails, type YookassaOptions } from '../interfaces';
import { HttpService } from '@nestjs/axios';
export declare class InvoiceService {
    private readonly options;
    private readonly httpService;
    constructor(options: YookassaOptions, httpService: HttpService);
    create(invoiceData: InvoiceCreateRequest): Promise<InvoiceDetails>;
    getOne(invoiceId: string): Promise<InvoiceDetails>;
    private getAuthHeader;
}
