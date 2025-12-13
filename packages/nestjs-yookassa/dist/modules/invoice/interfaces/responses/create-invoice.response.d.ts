import type { Invoice } from './invoice.response';
import type { YookassaMetadata } from '../../../../common/types/metadata.type';
export interface CreateInvoiceResponse<T extends YookassaMetadata = YookassaMetadata> extends Invoice<T> {
}
