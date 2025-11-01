import { Module } from '@nestjs/common'
import { PaymentMethodService } from './payment-method.service'

@Module({
	providers: [PaymentMethodService],
	exports: [PaymentMethodService]
})
export class PaymentMethodModule {}
