#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const manifests = [
	'package.json',
	'packages/jukette-core/package.json',
	'packages/jukette-audio/package.json',
	'packages/jukette-midi/package.json',
	'packages/jukette-soundcloud/package.json',
	'packages/jukette/package.json',
	'apps/docs/package.json',
]

const lockfileEntries = new Map([
	['package.json', ''],
	['packages/jukette-core/package.json', 'packages/jukette-core'],
	['packages/jukette-audio/package.json', 'packages/jukette-audio'],
	['packages/jukette-midi/package.json', 'packages/jukette-midi'],
	['packages/jukette-soundcloud/package.json', 'packages/jukette-soundcloud'],
	['packages/jukette/package.json', 'packages/jukette'],
	['apps/docs/package.json', 'apps/docs'],
])

const publishableVersions = new Map([
	['@remino/jukette-core', true],
	['@remino/jukette-audio', true],
	['@remino/jukette-midi', true],
	['@remino/jukette-soundcloud', true],
	['jukette', true],
])

const updateManifest = (manifest, version) => {
	manifest.version = version

	for (const field of ['dependencies', 'devDependencies', 'peerDependencies']) {
		const deps = manifest[field]
		if (!deps) continue

		for (const dependency of Object.keys(deps)) {
			if (publishableVersions.has(dependency)) {
				deps[dependency] = version
			}
		}
	}

	return manifest
}

const run = async ([command, version]) => {
	if (command !== 'bump' || !version) {
		throw new Error('Usage: release-workspace-versions.mjs bump <version>')
	}

	const updated = await Promise.all(
		manifests.map(async manifestPath => {
			const absolutePath = resolve(root, manifestPath)
			const manifest = JSON.parse(await readFile(absolutePath, 'utf8'))
			const updatedManifest = updateManifest(manifest, version)
			await writeFile(
				absolutePath,
				`${JSON.stringify(updatedManifest, null, '\t')}\n`
			)
			return [manifestPath, updatedManifest]
		})
	)

	const lockfilePath = resolve(root, 'package-lock.json')
	const lockfile = JSON.parse(await readFile(lockfilePath, 'utf8'))
	for (const [manifestPath, lockfilePathname] of lockfileEntries) {
		const entry = lockfile.packages[lockfilePathname]
		if (!entry) continue
		if (!updated.some(([path]) => path === manifestPath)) continue
		lockfile.packages[lockfilePathname] = updateManifest({ ...entry }, version)
	}
	await writeFile(lockfilePath, `${JSON.stringify(lockfile, null, '\t')}\n`)
}

if (import.meta.url === `file://${process.argv[1]}`) {
	run(process.argv.slice(2)).catch(error => {
		console.error(error.message)
		process.exitCode = 1
	})
}
