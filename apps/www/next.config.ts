'use strict'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	trailingSlash: false,
	skipTrailingSlashRedirect: true,
	experimental: {
		optimizePackageImports: ['tailwindcss'],
	},
}

export default nextConfig
