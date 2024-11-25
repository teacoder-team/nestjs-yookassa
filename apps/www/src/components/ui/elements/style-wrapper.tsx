'use client'

import * as React from 'react'

import { Style } from '@/src/constants/styles.constants'

interface StyleWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
	styleName?: Style['name']
}

export function StyleWrapper({ styleName, children }: StyleWrapperProps) {
	if (!styleName) {
		return <>{children}</>
	}

	return null
}
