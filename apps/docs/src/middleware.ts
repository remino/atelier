import {
	defineChainedMiddleware,
	type Middleware,
	proxyFiles,
	utf8,
} from '@remino/astro-middleware'

const siteRoot = import.meta.env.PARENT_SITE_ROOT

if (!siteRoot) {
	throw new Error('PARENT_SITE_ROOT must point to the parent site checkout.')
}

export const onRequest = defineChainedMiddleware(
	utf8,
	proxyFiles({
		base: '/',
		paths: {
			'/fonts/': `${siteRoot}/fonts/dist/public/fonts`,
			'/nav/': `${siteRoot}/nav/dist/public/nav`,
		},
	}) as Middleware
)
