import Link from 'next/link'
import { FaGithub } from 'react-icons/fa'

import { Button } from '../../ui/common/button'
import { ModeSwitcher } from '../../ui/elements/mode-switcher'

import { Logo } from './logo'

export function MainNav() {
	return (
		<div className='hidden h-16 w-full items-center justify-between md:flex'>
			<Logo />
			<nav className='flex items-center gap-4 text-sm xl:gap-6'>
				<ModeSwitcher />
				<Link
					href='https://github.com/teacoder-team/nestjs-yookassa'
					target='_blank'
				>
					<Button className='text-white'>
						<FaGithub className='mr-2 size-4' />
						Github
					</Button>
				</Link>
			</nav>
		</div>
	)
}
