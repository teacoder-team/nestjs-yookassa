import { getHighlighter } from '@shikijs/compat'
import {
	type ComputedFields,
	defineDocumentType,
	makeSource
} from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import { codeImport } from 'remark-code-import'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const computedFields: ComputedFields = {
	slug: {
		type: 'string',
		resolve: doc => `/${doc._raw.flattenedPath}`
	},
	slugAsParams: {
		type: 'string',
		resolve: doc => doc._raw.flattenedPath.split('/').slice(1).join('/')
	}
}

export const Doc = defineDocumentType(() => ({
	name: 'Doc',
	filePathPattern: `docs/**/*.mdx`,
	contentType: 'mdx',
	fields: {
		title: {
			type: 'string',
			required: true
		},
		description: {
			type: 'string',
			required: true
		},
		toc: {
			type: 'boolean',
			default: true,
			required: false
		}
	},
	computedFields
}))

export default makeSource({
	contentDirPath: './src/content',
	documentTypes: [Doc],
	mdx: {
		remarkPlugins: [remarkGfm, codeImport],
		rehypePlugins: [
			rehypeSlug,
			[
				rehypePrettyCode,
				{
					theme: 'github-dark-default',
					getHighlighter,
					onVisitHighlightedLine(node: any) {
						node.properties.className = [
							...(node.properties.className || []),
							'code-line-highlight'
						]
					},
					onVisitLine(node: any) {
						node.properties.className = [
							...(node.properties.className || []),
							'code-line'
						]
					},
					onVisitHighlightedWord(node: any) {
						node.properties.className = [
							...(node.properties.className || []),
							'code-word-highlight'
						]
					}
				}
			],
			() => {
				return tree => {
					visit(tree, node => {
						if (
							node?.type === 'element' &&
							node?.tagName === 'div'
						) {
							if (
								!(
									'data-rehype-pretty-code-fragment' in
									node.properties
								)
							) {
								return
							}

							const preElement = node.children.at(-1)
							if (preElement.tagName !== 'pre') {
								return
							}

							preElement.properties['__withMeta__'] =
								node.children.at(0).tagName === 'div'
							preElement.properties['__rawString__'] =
								node.__rawString__

							if (node.__src__) {
								preElement.properties['__src__'] = node.__src__
							}

							if (node.__event__) {
								preElement.properties['__event__'] =
									node.__event__
							}

							if (node.__style__) {
								preElement.properties['__style__'] =
									node.__style__
							}
						}
					})
					return tree
				}
			},
			[
				rehypeAutolinkHeadings,
				{
					properties: {
						className: ['subheading-anchor'],
						ariaLabel: 'Link to section'
					}
				}
			]
		]
	}
})
