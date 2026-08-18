#!/usr/bin/env node

import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const workspaces = [
	'@remino/jukette-core',
	'@remino/jukette-audio',
	'@remino/jukette-midi',
	'@remino/jukette-soundcloud',
	'jukette',
]
const manifests = [
	'package.json',
	'package-lock.json',
	'packages/core/package.json',
	'packages/audio/package.json',
	'packages/midi/package.json',
	'packages/soundcloud/package.json',
	'packages/jukette/package.json',
	'apps/docs/package.json',
]

const run = (command, args) => {
	console.log(`\n$ ${command} ${args.join(' ')}`)
	const result = spawnSync(command, args, {
		cwd: root,
		stdio: 'inherit',
	})
	if (result.status !== 0) {
		throw new Error(`${command} exited with status ${result.status}`)
	}
}

const assertVersion = version => {
	if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(version)) {
		throw new Error('Version must be a semver value such as 0.10.0')
	}
}

const assertClean = () => {
	const result = spawnSync('git', ['diff', '--quiet', 'HEAD'], {
		cwd: root,
		stdio: 'ignore',
	})
	if (result.status !== 0) {
		throw new Error('Working tree must be clean before a Jukette release')
	}
}

const runChecks = () => {
	run('npm', ['test'])
	run('npm', ['run', 'typecheck'])
	run('npm', ['run', 'lint'])
	run('npm', ['run', 'format:check'])
	run('npm', ['run', 'build:packages'])
}

const packWorkspaces = () => {
	for (const workspace of workspaces) {
		run('npm', ['pack', '--dry-run', '--workspace', workspace])
	}
}

const bump = version => {
	run('node', ['bin/release-workspace-versions.mjs', 'bump', version])
}

const commit = version => {
	run('git', ['add', '--', ...manifests])
	run('git', ['commit', '-m', `Release Jukette v${version}`])
	run('git', [
		'tag',
		'-a',
		`jukette-v${version}`,
		'-m',
		`Release Jukette v${version}`,
	])
}

const release = version => {
	assertVersion(version)
	assertClean()
	runChecks()
	bump(version)
	run('npm', ['run', 'build:packages'])
	packWorkspaces()
	commit(version)
	run('node', ['bin/publish-workspaces-with-otp.mjs'])
}

const dryRun = () => {
	runChecks()
	packWorkspaces()
}

const [command, version] = process.argv.slice(2)
try {
	if (command === 'dry-run') dryRun()
	else if (command === 'release') release(version)
	else
		throw new Error('Usage: release-jukette.mjs <dry-run | release> [version]')
} catch (error) {
	console.error(`\n${error.message}`)
	process.exitCode = 1
}
