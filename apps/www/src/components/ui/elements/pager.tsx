'use client'

import { Doc } from 'contentlayer/generated'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { nav } from '../../layout/sidebar/app-sidebar'
import { Button } from '../common/button'

import { NavItem, NavItemWithChildren } from '@/src/types/nav.types'

interface DocsPagerProps {
	doc: Doc
}

export function DocsPager({ doc }: DocsPagerProps) {
	const pager = getPagerForDoc(doc)

	if (!pager) {
		return null
	}

	return (
		<div className='flex flex-row items-center justify-between'>
			{pager?.prev?.url && (
				<Button variant='ghost' asChild>
					<Link href={pager.prev.url}>
						<ChevronLeft className='mr-2' />
						{pager.prev.title}
					</Link>
				</Button>
			)}
			{pager?.next?.url && (
				<Button variant='ghost' className='ml-auto' asChild>
					<Link href={pager.next.url}>
						{pager.next.title}
						<ChevronRight className='ml-2' />
					</Link>
				</Button>
			)}
		</div>
	)
}

export function getPagerForDoc(doc: Doc) {
	const flattenedLinks = [null, ...flatten(nav.navMain), null]
	const activeIndex = flattenedLinks.findIndex(link => doc.slug === link?.url)
	const prev = activeIndex !== 0 ? flattenedLinks[activeIndex - 1] : null
	const next =
		activeIndex !== flattenedLinks.length - 1
			? flattenedLinks[activeIndex + 1]
			: null
	return {
		prev,
		next
	}
}

export function flatten(links: NavItemWithChildren[]): NavItem[] {
	return links.reduce<NavItem[]>((flat, link) => {
		return flat.concat(link.items?.length ? flatten(link.items) : link)
	}, [])
}
