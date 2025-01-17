'use client'

import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useCallback } from 'react'

import { Button } from '../common/button'

export function ModeSwitcher() {
	const { setTheme, resolvedTheme } = useTheme()

	const toggleTheme = useCallback(() => {
		setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
	}, [resolvedTheme, setTheme])

	return (
		<Button variant='ghost' className='size-8 px-0' onClick={toggleTheme}>
			<SunIcon className='hidden [html.dark_&]:block' />
			<MoonIcon className='hidden [html.light_&]:block' />
		</Button>
	)
}
