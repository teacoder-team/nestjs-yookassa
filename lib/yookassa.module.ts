import { HttpModule } from '@nestjs/axios'
import { type DynamicModule, Global, Module } from '@nestjs/common'
import {
	type YookassaAsyncOptions,
	type YookassaOptions,
	YookassaOptionsSymbol
} from './interfaces/yookassa-options.interface'
import { YookassaService } from './yookassa.service'

@Global()
@Module({})
export class YookassaModule {
	public static forRoot(options: YookassaOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [HttpModule],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useValue: options
				},
				YookassaService
			],
			exports: [YookassaService],
			global: true
		}
	}

	public static forRootAsync(options: YookassaAsyncOptions): DynamicModule {
		return {
			module: YookassaModule,
			imports: [HttpModule, ...(options.imports || [])],
			providers: [
				{
					provide: YookassaOptionsSymbol,
					useFactory: options.useFactory,
					inject: options.inject || []
				},
				YookassaService
			],
			exports: [YookassaService],
			global: true
		}
	}
}
