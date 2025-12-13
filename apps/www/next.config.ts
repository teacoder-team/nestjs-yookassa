'use strict'

import { createMDX } from 'fumadocs-mdx/next'
import type { NextConfig } from 'next'

const withMDX = createMDX({
	configPath: './source.config.ts'
})

const config: NextConfig = {
	reactStrictMode: true
}

export default withMDX(config)
