import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const deployDir = process.env.ATELIER_DEPLOY_DIR ?? 'deploy'
const outputDir = `${deployDir}/public`

const npm = (...args) =>
	execFileSync('npm', args, {
		cwd: root,
		env: { ...process.env, ATELIER_SITE_OUT_DIR: outputDir },
		stdio: 'inherit',
	})

npm('run', 'build:packages')
npm('run', 'build:docs')
