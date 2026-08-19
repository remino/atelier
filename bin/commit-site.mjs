import { execFileSync, spawnSync } from 'node:child_process'
import { resolve } from 'node:path'
import { deployBranch, deployDir, root } from './site-env.mjs'
const worktree = resolve(root, deployDir)
const sourceCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
	cwd: root,
	encoding: 'utf8',
}).trim()

execFileSync('git', ['add', '--all'], { cwd: worktree, stdio: 'inherit' })
const staged = spawnSync('git', ['diff', '--cached', '--quiet'], {
	cwd: worktree,
})

if (staged.status === 0) {
	console.log(`No site changes to commit on ${deployBranch}`)
	process.exit(0)
}

if (staged.status === 1) {
	execFileSync('git', ['commit', '-m', `Add build for ${sourceCommit}`], {
		cwd: worktree,
		stdio: 'inherit',
	})
	process.exit(0)
}

throw new Error('Unable to inspect staged site changes')
