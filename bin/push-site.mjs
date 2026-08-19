import { execFileSync } from 'node:child_process'
import { deployBranch, deployDir, root } from './site-env.mjs'
const worktree = resolve(root, deployDir)
execFileSync('git', ['push', 'origin', `HEAD:${deployBranch}`], {
	cwd: worktree,
	stdio: 'inherit',
})
