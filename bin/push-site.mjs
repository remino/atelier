import { execFileSync } from 'node:child_process'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const deployDir = process.env.ATELIER_DEPLOY_DIR ?? 'deploy'
const deployBranch = process.env.ATELIER_DEPLOY_BRANCH ?? 'deploy'
const worktree = resolve(root, deployDir)
execFileSync('git', ['push', 'origin', `HEAD:${deployBranch}`], {
	cwd: worktree,
	stdio: 'inherit',
})
