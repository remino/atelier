import { execFileSync } from 'node:child_process'
import { deployDir, root } from './site-env.mjs'
const dryRun = process.argv.includes('--dry-run')

execFileSync('rsdeploy', dryRun ? [] : ['-w'], {
	cwd: root,
	env: {
		...process.env,
		RSDEPLOY_FILTER: process.env.RSDEPLOY_FILTER ?? '.rsdeploy-filter',
		RSDEPLOY_SRC: `${deployDir}/`,
	},
	stdio: 'inherit',
})
