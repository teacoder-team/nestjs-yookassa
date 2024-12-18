import { allDocs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import Balancer from 'react-wrap-balancer'

import { Mdx } from '@/src/components/ui/elements/mdx-components'
import { cn } from '@/src/utils/tw-merge'

type Params = Promise<{ slug: string[] }>

async function getDocFromParams(slug: string[]) {
	const doc = allDocs.find(doc => doc.slugAsParams === slug.join('/'))

	if (!doc) {
		return null
	}

	return doc
}

// export async function generateStaticParams(): Promise<{ params: Params }[]> {
// 	return allDocs.map(doc => ({
// 		params: { slug: doc.slugAsParams.split('/') }
// 	}))
// }

export default async function DocPage(props: { params: Params }) {
	const { slug } = await props.params

	const doc = await getDocFromParams(slug)

	if (!doc) {
		notFound()
	}

	return (
		<main className='px-16 pt-10'>
			<div className='space-y-2'>
				<h1
					className={cn(
						'scroll-m-20 text-3xl font-bold tracking-tight'
					)}
				>
					{doc.title}
				</h1>
				{doc.description && (
					<p className='text-base text-muted-foreground'>
						<Balancer>{doc.description}</Balancer>
					</p>
				)}
			</div>
			{/* {doc.links ? (
					<div className='flex items-center space-x-2 pt-4'>
						{doc.links?.doc && (
							<Link
								href={doc.links.doc}
								target='_blank'
								rel='noreferrer'
								className={cn(
									badgeVariants({ variant: 'secondary' }),
									'gap-1'
								)}
							>
								Docs
								<ExternalLink className='h-3 w-3' />
							</Link>
						)}
						{doc.links?.api && (
							<Link
								href={doc.links.api}
								target='_blank'
								rel='noreferrer'
								className={cn(
									badgeVariants({ variant: 'secondary' }),
									'gap-1'
								)}
							>
								API Reference
								<ExternalLink className='h-3 w-3' />
							</Link>
						)}
					</div>
				) : null}*/}
			<div className='pb-12 pt-8'>
				<Mdx code={doc.body.code} />
			</div>
			{/*<DocsPager doc={doc} />
			</div> */}
			{/* <div className='hidden text-sm xl:block'>
				<div className='sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4'>
					<div className='no-scrollbar h-full overflow-auto pb-10'>
						{doc.toc && <DashboardTableOfContents toc={toc} />}
						<OpenInV0Cta className='mt-6 max-w-[80%]' />
					</div>
				</div> */}
		</main>
	)
}
