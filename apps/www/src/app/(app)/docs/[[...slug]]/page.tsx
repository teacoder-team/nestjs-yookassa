import {
	DocsBody,
	DocsDescription,
	DocsPage,
	DocsTitle
} from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'

import { getMDXComponents } from '@/components/shared/mdx-components'

import { source } from '@/lib/source'

type Params = Promise<{ slug: string[] }>

export default async function DocPage({ params }: { params: Params }) {
	const { slug } = await params

	const page = source.getPage(slug)

	if (!page) notFound()

	const MDX = page.data.body

	return (
		<DocsPage toc={page.data.toc} full={page.data.full}>
			<DocsTitle>{page.data.title}</DocsTitle>
			<DocsDescription>{page.data.description}</DocsDescription>
			<DocsBody>
				<MDX components={getMDXComponents()} />
			</DocsBody>
		</DocsPage>
	)
}
