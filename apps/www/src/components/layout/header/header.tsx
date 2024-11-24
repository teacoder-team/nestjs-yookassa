import { MainNav } from './main-nav'
import { MobileNav } from './mobile-nav'

export function Header() {
	return (
		<header className='bg-whitesm:bg-white/90 sticky inset-x-0 top-0 z-30 border-b border-gray-200 drop-shadow-lg sm:backdrop-blur-lg'>
			<div className='max-w-8xl relative mx-auto px-4 lg:px-8'>
				<MainNav />
				<MobileNav />
			</div>
		</header>
	)
}
