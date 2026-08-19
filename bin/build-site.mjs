import { execFileSync } from 'node:child_process'
import { deployDir, root } from './site-env.mjs'
const outputDir = `${deployDir}/public`

const npm = (...args) =>
	execFileSync('npm', args, {
		cwd: root,
		env: { ...process.env, ATELIER_SITE_OUT_DIR: outputDir },
		stdio: 'inherit',
	})

npm('run', 'build:packages')
npm('run', 'build:docs')
