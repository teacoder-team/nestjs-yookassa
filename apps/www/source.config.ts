import { transformerRemoveNotationEscape } from '@shikijs/transformers'
import { rehypeCodeDefaultOptions } from 'fumadocs-core/mdx-plugins'
import { remarkInstall } from 'fumadocs-docgen'
import { defineConfig, defineDocs } from 'fumadocs-mdx/config'
import { transformerTwoslash } from 'fumadocs-twoslash'
import { createFileSystemTypesCache } from 'fumadocs-twoslash/cache-fs'
import rehypeKatex from 'rehype-katex'

export const { docs, meta } = defineDocs({
	dir: 'src/content/docs'
})

export default defineConfig({
	mdxOptions: {
		rehypeCodeOptions: {
			lazy: true,
			experimentalJSEngine: true,
			langs: ['ts', 'js', 'html', 'tsx', 'mdx'],
			inline: 'tailing-curly-colon',
			themes: {
				light: 'catppuccin-latte',
				dark: 'catppuccin-mocha'
			},
			transformers: [
				...(rehypeCodeDefaultOptions.transformers ?? []),
				transformerTwoslash({
					typesCache: createFileSystemTypesCache()
				}),
				transformerRemoveNotationEscape()
			]
		},
		remarkCodeTabOptions: {
			parseMdx: true
		},
		remarkPlugins: [
			[
				remarkInstall,
				{
					persist: {
						id: 'package-manager'
					}
				}
			]
		],
		rehypePlugins: v => [rehypeKatex, ...v]
	}
})
