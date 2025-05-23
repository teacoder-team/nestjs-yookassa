'use strict'

import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMDX = createMDX()

const config: NextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	trailingSlash: false,
	skipTrailingSlashRedirect: true,
	experimental: {
		optimizePackageImports: ['tailwindcss']
	}
}

export default withMDX(config)
