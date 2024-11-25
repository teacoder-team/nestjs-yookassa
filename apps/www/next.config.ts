'use strict'

import type { NextConfig } from 'next'
import { createContentlayerPlugin } from 'next-contentlayer2'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	trailingSlash: false,
	skipTrailingSlashRedirect: true,
	experimental: {
		optimizePackageImports: ['tailwindcss']
	}
}

const withContentlayer = createContentlayerPlugin({
	// Additional Contentlayer config options
})

export default withContentlayer(nextConfig)
