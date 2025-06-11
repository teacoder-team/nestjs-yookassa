import type { Amount } from './common.interface'

/**
 * Тип для метода оплаты, который может быть одним из нескольких типов.
 * @type {PaymentMethodSberLoan | PaymentMethodMobileBalance | PaymentMethodCard | PaymentMethodCash | PaymentMethodSbp | PaymentMethodB2bSberbank | PaymentMethodElectronicСertificate | PaymentMethodYooMoney | PaymentMethodSberbank | PaymentMethodTinkoffBank}
 */
export type PaymentMethod =
	| PaymentMethodSberLoan
	| PaymentMethodMobileBalance
	| PaymentMethodCard
	| PaymentMethodCash
	| PaymentMethodSbp
	| PaymentMethodB2bSberbank
	| PaymentMethodElectronicСertificate
	| PaymentMethodYooMoney
	| PaymentMethodSberbank
	| PaymentMethodTinkoffBank

/**
 * Перечисление возможных методов оплаты.
 * Каждый метод оплаты представлен уникальным типом.
 * @enum {string}
 */
export enum PaymentMethodsEnum {
	/**
	 * «Покупки в кредит» от СберБанка
	 */
	sber_loan = 'sber_loan',

	/**
	 * Баланс мобильного телефона
	 */
	mobile_balance = 'mobile_balance',

	/**
	 * Банковская карта
	 */
	bank_card = 'bank_card',

	/**
	 * Наличные
	 */
	cash = 'cash',

	/**
	 * Система быстрых платежей
	 */
	sbp = 'sbp',

	/**
	 * B2B Сбербанк
	 */
	b2b_sberbank = 'b2b_sberbank',

	/**
	 * Электронный сертификат
	 */
	electronic_certificate = 'electronic_certificate',

	/**
	 * YooMoney
	 */
	yoo_money = 'yoo_money',

	/**
	 * Сбербанк
	 */
	sberbank = 'sberbank',

	/**
	 * Альфа-Банк
	 */
	alfabank = 'alfabank',

	/**
	 * Тинькофф Банк
	 */
	tinkoff_bank = 'tinkoff_bank'
}

export interface PaymentMethodSberLoan {
	/**
	 * Тип метода — «Покупки в кредит» от СберБанка
	 */
	type: PaymentMethodsEnum.sber_loan
}

/**
 * Тип, представляющий способ оплаты через баланс мобильного телефона.
 */
export interface PaymentMethodMobileBalance {
	/**
	 * Тип метода — мобильный баланс
	 */
	type: PaymentMethodsEnum.mobile_balance
	/**
	 * Номер телефона, с которого будет списана сумма.
	 * Указывается в формате ITU-T E.164, например 79000000000.
	 */
	phone: string
}

/**
 * Тип, представляющий способ оплаты с использованием банковской карты.
 */
export interface PaymentMethodCard {
	/**
	 * Тип метода — банковская карта
	 */
	type: PaymentMethodsEnum.bank_card

	/**
	 * Данные банковской карты (необходимы, если вы собираете данные карты пользователей на своей стороне).
	 */
	card?: {
		/**
		 * Номер карты.
		 */
		number: string

		/**
		 * Год истечения срока действия карты.
		 * Необязательное поле.
		 */
		expiry_year?: string

		/**
		 * Месяц истечения срока действия.
		 */
		expiry_month: string

		/**
		 * Имя владельца карты.
		 * Необязательное поле.
		 */
		cardholder?: string

		/**
		 * Код безопасности карты (CVC).
		 * Необязательное поле.
		 */
		csc?: string
	}
}

/**
 * Тип для подтверждения через наличные.
 */
export interface PaymentMethodCash {
	/**
	 * Тип метода — Наличные
	 */
	type: PaymentMethodsEnum.cash
	/**
	 * Номер телефона для подтверждения наличных платежей.
	 * Необязательное поле.
	 */
	phone?: string
}

/**
 * Тип для подтверждения через СБП (Система быстрых платежей).
 */
export interface PaymentMethodSbp {
	/**
	 * Тип метода — Система быстрых платежей
	 */
	type: PaymentMethodsEnum.sbp
}

/**
 * Тип для подтверждения через B2B Сбербанк.
 */
export interface PaymentMethodB2bSberbank {
	/**
	 * Тип метода — B2B Сбербанк
	 */
	type: PaymentMethodsEnum.b2b_sberbank

	/**
	 * Назначение платежа.
	 */
	payment_purpose: string

	/**
	 * Данные о НДС.
	 */
	vat_data: {
		/**
		 * Тип НДС.
		 */
		type: 'mixed' | 'calculated' | 'untaxed'
		rate: number

		/**
		 * Сумма НДС.
		 * Необязательное поле.
		 */
		amount?: Amount
	}
}

/**
 * Тип для подтверждения с использованием электронного сертификата (ФЭС НСПК).
 */
export interface PaymentMethodElectronicСertificate {
	/**
	 * Тип метода оплаты — электронный сертификат.
	 * Значение: `electronic_certificate`.
	 */
	type: PaymentMethodsEnum.electronic_certificate

	/**
	 * Корзина покупки — список товаров, которые можно оплатить по сертификату.
	 * Необходимо передавать только при оплате на готовой странице ЮKassa.
	 */
	articles?: {
		/**
		 * Порядковый номер товара в корзине (от 1 до 999 включительно).
		 */
		article_number: number

		/**
		 * Код ТРУ. Формат: NNNNNNNNN.NNNNNNNNNYYYYMMMMZZZ
		 * Пример: 329921120.06001010200080001643
		 */
		tru_code: string

		/**
		 * Код товара в вашей системе.
		 * Максимум 128 символов.
		 */
		article_code?: string

		/**
		 * Название товара в вашей системе.
		 * Отображается на форме ЮKassa.
		 * Максимум 128 символов.
		 */
		article_name: string

		/**
		 * Количество единиц товара. Целое положительное число.
		 */
		quantity: number

		/**
		 * Цена за единицу товара.
		 */
		price: {
			/**
			 * Сумма в валюте. Дробное значение с точкой в качестве разделителя.
			 * Пример: "1000.00"
			 */
			value: string

			/**
			 * Трехбуквенный код валюты по ISO-4217.
			 * Пример: "RUB"
			 */
			currency: string
		}
	}[]

	/**
	 * Произвольные дополнительные данные.
	 * Максимум 16 ключей, имя ключа — до 32 символов, значение — до 512 символов.
	 */
	metadata?: Record<string, string>

	/**
	 * Данные банковской карты (если вы собираете данные карты на своей стороне).
	 */
	card?: {
		/**
		 * Номер банковской карты.
		 */
		number: string

		/**
		 * Год окончания срока действия карты (формат: YYYY).
		 */
		expiry_year: string

		/**
		 * Месяц окончания срока действия карты (формат: MM).
		 */
		expiry_month: string

		/**
		 * Имя владельца карты.
		 */
		cardholder?: string

		/**
		 * CVC/CVV код (3–4 цифры).
		 */
		csc?: string
	}

	/**
	 * Данные от ФЭС НСПК для оплаты по электронному сертификату.
	 * Обязательное поле при оплате со сбором данных на вашей стороне.
	 */
	electronic_certificate?: {
		/**
		 * Сумма, которую необходимо списать с электронного сертификата.
		 * Значение из поля `totalCertAmount`, полученного при предварительном одобрении (Pre-Auth).
		 */
		amount: Amount

		/**
		 * Идентификатор корзины покупки в НСПК.
		 * Значение `purchaseBasketId`, полученное в ответе от ФЭС НСПК при Pre-Auth.
		 */
		basket_id: string
	}
}

/**
 * Тип для подтверждения с использованием YooMoney.
 */
export interface PaymentMethodYooMoney {
	/**
	 * Тип метода — YooMoney
	 */
	type: PaymentMethodsEnum.yoo_money
}

/**
 * Тип для подтверждения через Сбербанк.
 */
export interface PaymentMethodSberbank {
	/**
	 * Тип метода — Сбербанк
	 */
	type: PaymentMethodsEnum.sberbank

	/**
	 * Номер телефона в Сбербанке.
	 * Необязательное поле.
	 */
	phone?: string
}

/**
 * Тип для подтверждения через Тинькофф Банк.
 */
export interface PaymentMethodTinkoffBank {
	/**
	 * Тип метода — Тинькофф Банк
	 */
	type: PaymentMethodsEnum.tinkoff_bank
}
