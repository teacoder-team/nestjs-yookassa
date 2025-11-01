import { randomUUID } from 'crypto'

export const YOOKASSA_API_URL = 'https://api.yookassa.ru/v3'

export const YOOKASSA_HEADERS = {
	'Content-Type': 'application/json',
	'Idempotence-Key': randomUUID()
}
