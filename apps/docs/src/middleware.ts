import {
	defineChainedMiddleware,
	type Middleware,
	proxyFiles,
	utf8,
} from '@remino/astro-middleware'

const siteRoot = import.meta.env.REMINO_SITE_ROOT

if (!siteRoot) {
	throw new Error(
		'REMINO_SITE_ROOT must point to the shared remino.net checkout.',
	)
}

export const onRequest = defineChainedMiddleware(
	utf8,
	proxyFiles({
		base: '/',
		paths: {
			'/fonts/': `${siteRoot}/fonts/dist/public/fonts`,
			'/nav/': `${siteRoot}/nav/dist/public/nav`,
		},
	}) as Middleware,
)
