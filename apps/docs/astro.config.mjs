import { defineConfig } from 'astro/config'
import { resolve } from 'node:path'
import { unified } from '@astrojs/markdown-remark'
import compressor from 'astro-compressor'
import minifyHtml from 'astro-minify-html'
import rehypeCodeBlocks from './src/sites/jukette/lib/rehype-code-blocks.mjs'

export default defineConfig({
	site: 'https://remino.net/',
	trailingSlash: 'always',
	outDir: resolve(
		'../..',
		process.env.ATELIER_SITE_OUT_DIR ?? 'apps/docs/dist/public'
	),
	markdown: { processor: unified({ rehypePlugins: [rehypeCodeBlocks] }) },
	integrations: [
		minifyHtml({
			collapseWhitespace: true,
			removeComments: true,
			minifyCSS: true,
			minifyJS: true,
		}),
		compressor({
			fileExtensions: [
				'.css',
				'.js',
				'.json',
				'.html',
				'.xml',
				'.cjs',
				'.mjs',
				'.svg',
			],
		}),
	],
	vite: {
		envDir: resolve('../..'),
		build: { assetsInlineLimit: 0 },
		resolve: {
			alias: {
				'@remino/jukette-audio/auto': resolve(
					'../../packages/jukette-audio/src/lib/audio-auto.ts'
				),
				'@remino/jukette-midi/auto': resolve(
					'../../packages/jukette-midi/src/lib/midi-auto.ts'
				),
				'@remino/jukette-soundcloud/auto': resolve(
					'../../packages/jukette-soundcloud/src/lib/soundcloud-auto.ts'
				),
				'jukette/auto': resolve('../../packages/jukette/src/lib/auto.ts'),
				'@remino/jukette-core': resolve(
					'../../packages/jukette-core/src/lib/core.ts'
				),
				'@remino/jukette-audio': resolve(
					'../../packages/jukette-audio/src/lib/audio.ts'
				),
				'@remino/jukette-midi': resolve(
					'../../packages/jukette-midi/src/lib/midi-entry.ts'
				),
				'@remino/jukette-soundcloud': resolve(
					'../../packages/jukette-soundcloud/src/lib/soundcloud.ts'
				),
				jukette: resolve('../../packages/jukette/src/lib/jukette.ts'),
			},
		},
	},
})
