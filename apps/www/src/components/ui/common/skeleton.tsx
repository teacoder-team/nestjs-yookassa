import type { HTMLAttributes } from 'react'

import { cn } from '@/src/utils/tw-merge'

function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div
			className={cn('animate-pulse rounded-md bg-primary/10', className)}
			{...props}
		/>
	)
}

export { Skeleton }
