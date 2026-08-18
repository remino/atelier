import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { execFileSync } from 'node:child_process'

const root = resolve(import.meta.dirname, '..')
const deployDir = process.env.ATELIER_DEPLOY_DIR ?? 'deploy'
const deployBranch = process.env.ATELIER_DEPLOY_BRANCH ?? 'deploy'
const worktree = resolve(root, deployDir)

const git = (...args) =>
	execFileSync('git', args, { cwd: root, stdio: 'inherit' })
const output = (...args) =>
	execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()

const worktrees = output('worktree', 'list', '--porcelain')
const registered = worktrees
	.split('\n')
	.find(line => line === `worktree ${worktree}`)

if (registered) {
	console.log(`Site worktree already exists at ${deployDir}/`)
	await mkdir(resolve(worktree, 'public'), { recursive: true })
	process.exit(0)
}

if (existsSync(worktree)) {
	throw new Error(
		`${deployDir}/ exists but is not registered as a Git worktree`
	)
}

const branchExists = (() => {
	try {
		output('show-ref', '--verify', `refs/heads/${deployBranch}`)
		return true
	} catch {
		return false
	}
})()

if (branchExists) {
	git('worktree', 'add', worktree, deployBranch)
} else {
	git('worktree', 'add', '--orphan', '-b', deployBranch, worktree)
}

await mkdir(resolve(worktree, 'public'), { recursive: true })
console.log(`Site worktree ready at ${deployDir}/ on branch ${deployBranch}`)
