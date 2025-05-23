import { HomeIcon, ZapIcon } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
	return (
		<div className='flex h-[90vh] flex-col items-center justify-center text-center'>
			<h1 className='text-6xl font-bold'>Yookassa в NestJS</h1>
			<p className='text-muted-foreground mx-auto mt-6 max-w-4xl text-lg'>
				Простое и удобное решение для интеграции с платёжной системой
				Юкасса в вашем приложении на NestJS. Используйте эту библиотеку
				для реализации различных платежных сценариев, включая создание и
				управление платежами, обработку статусов и многое другое.
			</p>
			<div className='mt-6 grid w-[700px] grid-cols-2 gap-6'>
				<Link
					href='/docs/getting-started/introduction'
					className='border-border flex items-center rounded-md border px-5 py-4 transition-colors hover:border-indigo-500 hover:text-indigo-500'
				>
					<HomeIcon className='mr-3 size-5' />
					Введение
				</Link>
				<Link
					href='/docs/getting-started/installation'
					className='border-border flex items-center rounded-md border px-5 py-4 transition-colors hover:border-indigo-500 hover:text-indigo-500'
				>
					<ZapIcon className='mr-3 size-5' />
					Установка
				</Link>
			</div>
		</div>
	)
}
