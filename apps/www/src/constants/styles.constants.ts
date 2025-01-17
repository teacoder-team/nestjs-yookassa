export const STYLES = [
	{
		name: 'new-york',
		label: 'New York'
	},
	{
		name: 'default',
		label: 'Default'
	}
] as const

export type Style = (typeof STYLES)[number]
