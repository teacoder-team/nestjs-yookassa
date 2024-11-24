import type { PropsWithChildren } from 'react'

import { Header } from '@/src/components/layout/header/header'
import { AppSidebar } from '@/src/components/layout/sidebar/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/src/components/ui/sidebar'

export default function AppLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<div className='mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x'>
			<Header />
			<SidebarProvider>
				<AppSidebar className='pt-16' />
				<SidebarInset>
					<div
						className='animate-fadeInOut fixed right-[-500px] top-[80px] h-[500px] w-[500px]'
						style={{
							boxShadow: '-100px 0px 400px rgba(79, 70, 229, 0.6)'
						}}
					/>
					<main className='flex-1 p-7'>{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</div>
	)
}
