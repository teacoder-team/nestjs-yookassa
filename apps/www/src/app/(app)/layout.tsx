import { DocsLayout as FumadocsLayout } from 'fumadocs-ui/layouts/docs'
import type { PropsWithChildren } from 'react'

import { baseOptions } from './layout.config'
import { source } from '@/lib/source'

export default function AppLayout({ children }: PropsWithChildren<unknown>) {
	return (
		<FumadocsLayout {...baseOptions} tree={source.pageTree}>
			{children}
		</FumadocsLayout>
	)
}
