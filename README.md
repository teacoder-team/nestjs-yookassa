# NestJS Yookassa

С помощью этого модуля вы сможете легко создавать и управлять платежами, получать подробную информацию о транзакциях и многое другое.

## Установка

Для установки библиотеки выполните команду:

```bash
npm install nestjs-yookassa
```

## Подключение в модуле

Для подключения библиотеки в вашем проекте необходимо использовать один из двух методов:

-   forRoot — синхронная конфигурация.
-   forRootAsync — асинхронная конфигурация.

**1. Синхронное подключение (forRoot)**
Используйте этот метод, если у вас есть заранее настроенные значения для shopId и apiKey.

```typescript
import { Module } from '@nestjs/common'
import { YookassaModule } from 'nestjs-yookassa'

@Module({
	imports: [
		YookassaModule.forRoot({
			shopId: 'your-shop-id',
			apiKey: 'your-api-key'
		})
	]
})
export class AppModule {}
```

**2. Асинхронное подключение (forRootAsync)**
Используйте этот метод, если вы хотите загружать параметры конфигурации асинхронно, например, из базы данных или переменных окружения.

```typescript
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { YookassaModule } from 'nestjs-yookassa'

@Module({
	imports: [
		YookassaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				shopId: configService.getOrThrow('YOOKASSA_SHOP_ID'),
				apiKey: configService.getOrThrow('YOOKASSA_API_KEY')
			}),
			inject: [ConfigService]
		})
	]
})
export class AppModule {}
```
