import { AxiosInstance } from 'axios'

export function attachYookassaInterceptors(http: AxiosInstance) {
	http.interceptors.request.use(config => {
		console.log(
			`[YooKassa Request] → ${config.method?.toUpperCase()} ${config.url}`
		)
		return config
	})

	http.interceptors.response.use(
		res => res,
		async error => {
			const status = error?.response?.status

			// Auto retry logic (simple)
			if (status >= 500) {
				console.log('[YooKassa] Retrying request after server error...')
				return await http.request(error.config)
			}

			return Promise.reject(error)
		}
	)
}
