import type { Amount } from './common.interface'

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

export enum PaymentMethodsEnum {
	bank_card = 'bank_card',
	yoo_money = 'yoo_money',
	qiwi = 'qiwi',
	sberbank = 'sberbank',
	alfabank = 'alfabank',
	tinkoff_bank = 'tinkoff_bank',
	b2b_sberbank = 'b2b_sberbank',
	sbp = 'sbp',
	mobile_balance = 'mobile_balance',
	cash = 'cash',
	installments = 'installments'
}

export interface PaymentMethodCard {
	type: PaymentMethodsEnum.bank_card
	card?: {
		number: string
		expiry_year?: string
		expiry_month: string
		csc?: string
		cardholder?: string
	}
}

export interface PaymentMethodMobileBalance {
	type: PaymentMethodsEnum.mobile_balance
	phone: string
}

export interface PaymentMethodYooMoney {
	type: PaymentMethodsEnum.yoo_money
}

export interface PaymentMethodQiwi {
	type: PaymentMethodsEnum.qiwi
	phone?: string
}

export interface PaymentMethodSberbank {
	type: PaymentMethodsEnum.sberbank
	phone?: string
}

export interface PaymentMethodAlfabank {
	type: PaymentMethodsEnum.alfabank
	login?: string
}

export interface PaymentMethodTinkoff_bank {
	type: PaymentMethodsEnum.tinkoff_bank
}

export interface PaymentMethodB2b_sberbank {
	type: PaymentMethodsEnum.b2b_sberbank
	payment_purpose: string
	vat_data: {
		type: 'mixed' | 'calculated' | 'untaxed'
		amount?: Amount
	}
}

export interface PaymentMethodSbp {
	type: PaymentMethodsEnum.sbp
}

export interface PaymentMethodCash {
	type: PaymentMethodsEnum.cash
	phone?: string
}

export interface PaymentMethodInstallments {
	type: PaymentMethodsEnum.installments
}
