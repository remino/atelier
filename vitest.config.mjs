import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'

const resolvePath = (path) => fileURLToPath(new URL(path, import.meta.url))

export default defineConfig({
	resolve: {
		alias: {
			'@remino/jukette-core': resolvePath('./packages/core/src/lib/core.ts'),
			'@remino/jukette-audio': resolvePath('./packages/audio/src/lib/audio.ts'),
			'@remino/jukette-audio/auto': resolvePath('./packages/audio/src/lib/audio-auto.ts'),
			'@remino/jukette-midi': resolvePath('./packages/midi/src/lib/midi-entry.ts'),
			'@remino/jukette-midi/auto': resolvePath('./packages/midi/src/lib/midi-auto.ts'),
			'@remino/jukette-soundcloud': resolvePath('./packages/soundcloud/src/lib/soundcloud.ts'),
			'@remino/jukette-soundcloud/auto': resolvePath('./packages/soundcloud/src/lib/soundcloud-auto.ts'),
			jukette: resolvePath('./packages/jukette/src/lib/jukette.ts'),
			'jukette/auto': resolvePath('./packages/jukette/src/lib/auto.ts'),
		},
	},
	test: {
		environment: 'jsdom',
		globals: true,
		include: ['tests/jukette/**/*.test.js'],
		setupFiles: ['./tests/jukette/setup/common.js'],
	},
})
