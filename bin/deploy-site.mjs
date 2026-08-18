import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const deployDir = process.env.ATELIER_DEPLOY_DIR ?? 'deploy'
const dryRun = process.argv.includes('--dry-run')

execFileSync('rsdeploy', dryRun ? [] : ['-w'], {
	cwd: root,
	env: {
		...process.env,
		RSDEPLOY_FILTER: process.env.RSDEPLOY_FILTER ?? '.rsdeploy-filter',
		RSDEPLOY_SRC: `${deployDir}/public/`,
	},
	stdio: 'inherit',
})
