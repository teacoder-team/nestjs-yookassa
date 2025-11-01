import { Module } from '@nestjs/common'
import { RefundService } from './refund.service'

@Module({
	providers: [RefundService],
	exports: [RefundService]
})
export class RefundModule {}
