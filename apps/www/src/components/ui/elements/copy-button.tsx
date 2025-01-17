'use client'

import { DropdownMenuTriggerProps } from '@radix-ui/react-dropdown-menu'
import { CheckIcon, ClipboardIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import { Button, ButtonProps } from '../common/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '../common/dropdown-menu'

import { TypeEventSchema, trackEvent } from '@/src/schemas/events.schema'
import { NpmCommands } from '@/src/types/unist.types'
import { cn } from '@/src/utils/tw-merge'

interface CopyButtonProps extends ButtonProps {
	value: string
	src?: string
	event?: TypeEventSchema['name']
}

export async function copyToClipboardWithMeta(
	value: string,
	event?: TypeEventSchema
) {
	navigator.clipboard.writeText(value)
	if (event) {
		trackEvent(event)
	}
}

export function CopyButton({
	value,
	className,
	src,
	variant = 'ghost',
	event,
	...props
}: CopyButtonProps) {
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}, [isCopied])

	return (
		<Button
			size='icon'
			variant={variant}
			className={cn(
				'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3',
				className
			)}
			onClick={() => {
				copyToClipboardWithMeta(
					value,
					event
						? {
								name: event,
								properties: {
									code: value
								}
							}
						: undefined
				)
				setIsCopied(true)
			}}
			{...props}
		>
			<span className='sr-only'>Copy</span>
			{isCopied ? <CheckIcon /> : <ClipboardIcon />}
		</Button>
	)
}

interface CopyWithClassNamesProps extends DropdownMenuTriggerProps {
	value: string
	classNames: string
	className?: string
}

export function CopyWithClassNames({
	value,
	classNames,
	className,
	...props
}: CopyWithClassNamesProps) {
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}, [isCopied])

	const copyToClipboard = useCallback((value: string) => {
		copyToClipboardWithMeta(value)
		setIsCopied(true)
	}, [])

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size='icon'
					variant='ghost'
					className={cn(
						'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50',
						className
					)}
				>
					{isCopied ? (
						<CheckIcon className='h-3 w-3' />
					) : (
						<ClipboardIcon className='h-3 w-3' />
					)}
					<span className='sr-only'>Copy</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem onClick={() => copyToClipboard(value)}>
					Component
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => copyToClipboard(classNames)}>
					Classname
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

interface CopyNpmCommandButtonProps extends DropdownMenuTriggerProps {
	commands: Required<NpmCommands>
}

export function CopyNpmCommandButton({
	commands,
	className,
	...props
}: CopyNpmCommandButtonProps) {
	const [isCopied, setIsCopied] = useState(false)

	useEffect(() => {
		setTimeout(() => {
			setIsCopied(false)
		}, 2000)
	}, [isCopied])

	const copyCommand = useCallback(
		(value: string, pm: 'npm' | 'pnpm' | 'yarn' | 'bun') => {
			copyToClipboardWithMeta(value, {
				name: 'copy_npm_command',
				properties: {
					command: value,
					pm
				}
			})
			setIsCopied(true)
		},
		[]
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					size='icon'
					variant='ghost'
					className={cn(
						'relative z-10 h-6 w-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50',
						className
					)}
				>
					{isCopied ? (
						<CheckIcon className='h-3 w-3' />
					) : (
						<ClipboardIcon className='h-3 w-3' />
					)}
					<span className='sr-only'>Copy</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<DropdownMenuItem
					onClick={() => copyCommand(commands.__npmCommand__, 'npm')}
				>
					npm
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						copyCommand(commands.__yarnCommand__, 'yarn')
					}
				>
					yarn
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() =>
						copyCommand(commands.__pnpmCommand__, 'pnpm')
					}
				>
					pnpm
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => copyCommand(commands.__bunCommand__, 'bun')}
				>
					bun
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
