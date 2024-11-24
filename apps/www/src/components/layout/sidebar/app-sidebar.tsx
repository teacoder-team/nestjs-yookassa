import { ChevronRight } from 'lucide-react'
import { ComponentProps } from 'react'

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger
} from '../../ui/collapsible'
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
} from '../../ui/sidebar'

const data = {
	navMain: [
		{
			title: 'Начало работы',
			items: [
				{
					title: 'Введение',
					url: '/docs/getting-started'
				},
				{
					title: 'Инструкция по установке',
					url: '/docs/getting-started/installation'
				}
			]
		},
		{
			title: 'Платежи',
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
					url: '/docs/refunds/one'
				}
			]
		}
	]
}

export function AppSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarContent className='gap-0'>
				{data.navMain.map(item => (
					<Collapsible
						key={item.title}
						title={item.title}
						defaultOpen
						className='group/collapsible'
					>
						<SidebarGroup>
							<SidebarGroupLabel
								asChild
								className='group/label text-sm text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
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
				))}
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
