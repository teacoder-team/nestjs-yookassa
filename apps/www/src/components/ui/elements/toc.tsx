'use client'

import { useMemo } from 'react'

import { useActiveItem } from '@/src/hooks/use-active-item'
import { TableOfContents } from '@/src/utils/toc'
import { cn } from '@/src/utils/tw-merge'

interface TocProps {
	toc: TableOfContents
}

export function DashboardTableOfContents({ toc }: TocProps) {
	const itemIds = useMemo(
		() =>
			toc.items
				? toc.items
						.flatMap(item => [
							item.url,
							item?.items?.map(item => item.url)
						])
						.flat()
						.filter(Boolean)
						.map(id => id?.split('#')[1])
				: [],
		[toc]
	)

	// @ts-ignore
	const activeHeading = useActiveItem(itemIds)

	if (!toc?.items?.length) {
		return null
	}

	return (
		<div className='space-y-2'>
			<p className='font-medium'>На этой странице</p>
			<Tree tree={toc} activeItem={activeHeading} />
		</div>
	)
}

interface TreeProps {
	tree: TableOfContents
	level?: number
	activeItem?: string
}

function Tree({ tree, level = 1, activeItem }: TreeProps) {
	return tree?.items?.length && level < 3 ? (
		<ul className={cn('m-0 list-none', { 'pl-4': level !== 1 })}>
			{tree.items.map((item, index) => {
				return (
					<li key={index} className={cn('mt-0 pt-2')}>
						<a
							href={item.url}
							className={cn(
								'inline-block no-underline transition-colors hover:text-foreground',
								item.url === `#${activeItem}`
									? 'font-medium text-foreground'
									: 'text-muted-foreground'
							)}
						>
							{item.title}
						</a>
						{item.items?.length ? (
							<Tree
								tree={item}
								level={level + 1}
								activeItem={activeItem}
							/>
						) : null}
					</li>
				)
			})}
		</ul>
	) : null
}
