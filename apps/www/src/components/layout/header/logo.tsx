import Link from 'next/link'

export function Logo() {
	return (
		<div className='flex items-center justify-start gap-3'>
			<Link
				href='/'
				className='flex items-center gap-x-3 text-xl font-bold'
			>
				NestJS Yookassa
			</Link>
		</div>
	)
}
