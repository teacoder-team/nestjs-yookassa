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

### Работа с платежами

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
		type: PaymentMethodsEnum.bank_card
	},
	confirmation: {
		type: 'redirect',
		return_url: 'https://example.com/thanks'
	}
}

const paymentResponse = await this.yookassaService.createPayment(paymentData)

return paymentResponse
```

**2. Получение платежей**
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

return payments
```

**3. Получение деталей плтежа**
Получает подробную информацию о платеже по его ID, включая статус, сумму и другие данные.

-   paymentId (string): Уникальный идентификатор платежа.

Пример:

```typescript
const paymentId = '123456'

const payment = await this.yookassaService.getPaymentDetails(id)

if (!payment) {
	throw new NotFoundException('Платеж не найден')
}

return payment
```

**4. Подтверждение платежа**
Выполняет захват средств с карты клиента после того, как был создан платеж. Обычно этот метод используется, когда заказ подтвержден, и продавец готов забрать средства.

Параметры:

-   paymentId (string): Уникальный идентификатор платежа, который нужно подтвердить.
-   amount (Amount): Сумма, которую необходимо захватить.

Пример:

```typescript
const paymentId = '123456'

const paymentDetails = await this.yookassaService.getPaymentDetails(paymentId)

if (!paymentDetails) {
	throw new NotFoundException('Платеж не найден')
}

const amount: Amount = paymentDetails.amount

const capturedPaymentDetails = await this.yookassaService.capturePayment(
	paymentId,
	amount
)

return capturedPaymentDetails
```

**5. Отмена платежа**
Отменяет платеж по его ID.
Параметры:

-   paymentId (string): ID платежа, который нужно отменить.

Пример:

```typescript
const paymentId = '123456'

const canceledPaymentDetails =
	await this.yookassaService.cancelPayment(paymentId)

return canceledPaymentDetails
```

### Работа с возвратами

**1. Создание возврата**
Создаёт возврат средств по указанному платежу. Этот метод отправляет запрос на создание возврата с данными из refundData и возвращает информацию о созданном возврате.

Параметры:

-   refundData (RefundCreateRequest) — Данные для создания возврата. Пример структуры данных см. ниже.

Пример:

```typescript
const refundData: RefundCreateRequest = {
	payment_id: '123456',
	amount: {
		value: 500,
		currency: 'RUB'
	},
	description: 'Возврат за отмененный заказ'
}

const refundResponse = await this.yookassaService.createRefund(refundData)

return refundResponse
```

**2. Получение списка возвратов**
Получает список всех возвратов с возможностью фильтрации и пагинации.

Пример:

```typescript
const refunds = await this.yookassaService.getRefunds()

return refunds
```

**3. Получение деталей возврата**
Получает подробную информацию о возврате по его ID, включая статус, сумму и другие данные.

-   refundId (string) — Уникальный идентификатор возврата.

Пример:

```typescript
const refundId = '123456'

const refundDetails = await this.yookassaService.getRefundDetails(refundId)

if (!refundDetails) {
	throw new NotFoundException('Возврат не найден')
}

return refundDetails
```
