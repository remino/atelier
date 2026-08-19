import { resolve } from 'node:path'

export const root = resolve(import.meta.dirname, '..')

try {
	process.loadEnvFile(resolve(root, '.env'))
} catch {
	// The checked-in .env.example is sufficient for non-publishing builds.
}

export const deployDir = process.env.ATELIER_DEPLOY_DIR ?? 'apps/docs/dist'
export const deployBranch = process.env.ATELIER_DEPLOY_BRANCH ?? 'deploy'
export const siteOutputDir =
	process.env.ATELIER_SITE_OUT_DIR ?? `${deployDir}/public`
