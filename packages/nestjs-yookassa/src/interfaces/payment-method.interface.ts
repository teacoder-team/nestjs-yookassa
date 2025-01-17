import type { Amount } from './common.interface'

/**
 * Тип для метода оплаты, который может быть одним из нескольких типов.
 */
export type PaymentMethod =
	| PaymentMethodAlfabank
	| PaymentMethodMobileBalance
	| PaymentMethodCard
	| PaymentMethodInstallments
	| PaymentMethodCash
	| PaymentMethodSbp
	| PaymentMethodB2b_sberbank
	| PaymentMethodTinkoff_bank
	| PaymentMethodYooMoney
	| PaymentMethodQiwi
	| PaymentMethodSberbank

/**
 * Перечисление возможных методов оплаты.
 * Каждый метод оплаты представлен уникальным типом.
 * @enum {string}
 */
export enum PaymentMethodsEnum {
	/**
	 * Банковская карта
	 */
	bank_card = 'bank_card',

	/**
	 * YooMoney (бывший Яндекс.Деньги)
	 */
	yoo_money = 'yoo_money',

	/**
	 * Qiwi кошелек
	 */
	qiwi = 'qiwi',

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
	tinkoff_bank = 'tinkoff_bank',

	/**
	 * B2B Сбербанк
	 */
	b2b_sberbank = 'b2b_sberbank',

	/**
	 * Система быстрых платежей
	 */
	sbp = 'sbp',

	/**
	 * Баланс мобильного телефона
	 */
	mobile_balance = 'mobile_balance',

	/**
	 * Наличные
	 */
	cash = 'cash',

	/**
	 * Рассрочка
	 */
	installments = 'installments'
}

/**
 * Тип, представляющий способ оплаты с использованием банковской карты.
 */
export interface PaymentMethodCard {
	/**
	 * Тип метода — банковская карта
	 */
	type: PaymentMethodsEnum.bank_card
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
		 * Код безопасности карты (CVC).
		 * Необязательное поле.
		 */
		csc?: string

		/**
		 * Имя владельца карты.
		 * Необязательное поле.
		 */
		cardholder?: string
	}
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
	 */
	phone: string
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
 * Тип для подтверждения через Qiwi кошелек.
 */
export interface PaymentMethodQiwi {
	/**
	 * Тип метода — Qiwi
	 */
	type: PaymentMethodsEnum.qiwi
	/**
	 * Номер телефона в Qiwi.
	 * Необязательное поле.
	 */
	phone?: string
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
 * Тип для подтверждения через Альфа-Банк.
 */
export interface PaymentMethodAlfabank {
	/**
	 * Тип метода — Альфа-Банк
	 */
	type: PaymentMethodsEnum.alfabank
	/**
	 * Логин пользователя в Альфа-Банке.
	 * Необязательное поле.
	 */
	login?: string
}

/**
 * Тип для подтверждения через Тинькофф Банк.
 */
export interface PaymentMethodTinkoff_bank {
	/**
	 * Тип метода — Тинькофф Банк
	 */
	type: PaymentMethodsEnum.tinkoff_bank
}

/**
 * Тип для подтверждения через B2B Сбербанк.
 */
export interface PaymentMethodB2b_sberbank {
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
 * Тип для подтверждения через систему быстрых платежей (СБП).
 */
export interface PaymentMethodSbp {
	/**
	 * Тип метода — Система быстрых платежей
	 */
	type: PaymentMethodsEnum.sbp
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
 * Тип для подтверждения через рассрочку.
 */
export interface PaymentMethodInstallments {
	/**
	 * Тип метода — Рассрочка
	 */
	type: PaymentMethodsEnum.installments
}
