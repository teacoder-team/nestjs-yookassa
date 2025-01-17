'use client'

import { HTMLAttributes } from 'react'

import { Style } from '@/src/constants/styles.constants'

interface StyleWrapperProps extends HTMLAttributes<HTMLDivElement> {
	styleName?: Style['name']
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
	if (!styleName) {
		return <>{children}</>
	}

	return null
}
