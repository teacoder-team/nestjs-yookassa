export class YookassaError extends Error {
	public constructor(
		public code: string,
		public description: string,
		public data?: any
	) {
		super(description)
		this.name = 'YookassaError'
	}
}
