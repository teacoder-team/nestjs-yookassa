import { RootProvider } from 'fumadocs-ui/provider/next'
import './global.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'NestJS Yookassa by TeaCoder',
}

export default function Layout({ children }: LayoutProps<'/'>) {
	return (
		<html lang='ru' className={inter.className} suppressHydrationWarning>
			<body className='flex flex-col min-h-screen'>
				<RootProvider>{children}</RootProvider>
			</body>
		</html>
	)
}
