'use client'

import { ChevronRight } from 'lucide-react'
import type { ComponentProps } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail
} from '../../ui/common/sidebar'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from './collapsible'

export const nav = {
	navMain: [
		{
			title: 'Начало работы',
			url: '/',
			items: [
				{
					title: 'Введение',
					url: '/docs/getting-started/introduction'
				},
				{
					title: 'Инструкция по установке',
					url: '/docs/getting-started/installation'
				}
			]
		},
		{
			title: 'Платежи',
			url: '/docs/payments/create',
			items: [
				{
					title: 'Создание платежа',
					url: '/docs/payments/create'
				},
				{
					title: 'Подтверждение платежа',
					url: '/docs/payments/confirm'
				},
				{
					title: 'Отмена платежа',
					url: '/docs/payments/cancel'
				},
				{
					title: 'Список платежей',
					url: '/docs/payments/list'
				},
				{
					title: 'Информация о платеже',
					url: '/docs/payments/info'
				}
			]
		},
		{
			title: 'Возвраты',
			url: '/docs/refunds/create',
			items: [
				{
					title: 'Создание возврата',
					url: '/docs/refunds/create'
				},
				{
					title: 'Список возвратов',
					url: '/docs/refunds/list'
				},
				{
					title: 'Информация о возврате',
					url: '/docs/refunds/info'
				}
			]
		}
	]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent className='gap-0'>
				{nav.navMain.map(item => {
					return (
						<Collapsible
							key={item.title}
							title={item.title}
							defaultOpen
							className='group/collapsible'
						>
							<SidebarGroup>
								<SidebarGroupLabel
									asChild
									className='group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm'
								>
									<CollapsibleTrigger>
										{item.title}{' '}
										<ChevronRight className='ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90' />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent>
									<SidebarGroupContent>
										<SidebarMenu>
											{item.items.map(item => (
												<SidebarMenuItem
													className='ml-4'
													key={item.title}
												>
													<SidebarMenuButton asChild>
														<a href={item.url}>
															{item.title}
														</a>
													</SidebarMenuButton>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					)
				})}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
