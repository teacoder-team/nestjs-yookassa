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

## Методы

**1. Создание платежа**
Создает новый платеж через YooKassa. Этот метод отправляет запрос на создание нового платежа с данными из paymentData и возвращает информацию о созданном платеже.

Параметры:

-   paymentData (PaymentCreateRequest): Данные для создания платежа. Пример структуры данных см. ниже.

Пример:

```typescript
const paymentData: PaymentCreateRequest = {
	amount: {
		value: 1000,
		currency: 'RUB'
	},
	description: 'Test payment',
	payment_method_data: {
		type: PaymentMethodsEnum.yoo_money
	},
	confirmation: {
		type: 'redirect',
		return_url: 'https://example.com/thanks'
	},
	capture: false
}

const paymentResponse = await this.yookassaService.createPayment(paymentData)
console.log(paymentResponse)
```

**2. Отмена платежа**
Отменяет платеж по его ID.
Параметры:

-   paymentId (string): ID платежа, который нужно отменить.

Пример:

```typescript
const paymentId = '123456'
const canceledPaymentDetails =
	await this.yookassaService.cancelPayment(paymentId)
console.log(canceledPaymentDetails)
```

**3. Получение платежей**
Получает список всех платежей с возможностью фильтрации по дате и пагинации.

-   limit (number): Максимальное количество платежей на страницу (по умолчанию 10).
-   from (string): Начальная дата для фильтрации (формат YYYY-MM-DD).
-   to (string): Конечная дата для фильтрации (формат YYYY-MM-DD).

Пример:

```typescript
const payments = await this.yookassaService.getPayments(
	10,
	'2024-01-01',
	'2024-12-31'
)
console.log(payments)
```

**3. Получение деталей плтежа**
Получает подробную информацию о платеже по его ID, включая статус, сумму и другие данные.

-   paymentId (string): Уникальный идентификатор платежа.

Пример:

```typescript
const paymentId = '123456'
const paymentDetails = await this.yookassaService.getPaymentDetails(paymentId)
console.log(paymentDetails)
```
