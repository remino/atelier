import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
	baseDirectory: import.meta.dirname,
})

export default [
	{
		ignores: [
			'.astro/**',
			'.build/**',
			'build/**',
			'deploy/**',
			'dist/**',
			'node_modules/**',
			'bits/**',
			'public/**',
			'remarqueeble/**',
		],
	},
	...compat.config({
		env: {
			browser: true,
			jasmine: true,
			node: true,
		},
		extends: [
			'airbnb-base',
			'plugin:no-template-curly-in-string-fix/recommended',
			'prettier',
		],
		plugins: ['astro', 'jasmine'],
		settings: {
			'import/resolver': {
				node: { extensions: ['.astro', '.mjs', '.js', '.ts'] },
			},
		},
		rules: {
			'arrow-parens': ['error', 'as-needed'],
			'import/extensions': [
				'error',
				{ mjs: 'always', js: 'always', ts: 'always' },
			],
			indent: ['error', 'tab', { SwitchCase: 1 }],
			'no-tabs': ['error', { allowIndentationTabs: true }],
			'no-underscore-dangle': 1,
			'nuxt/no-cjs-in-config': 'off',
			semi: ['error', 'never'],
		},
		overrides: [
			{
				files: ['source/nav/nav.js'],
				rules: { 'wrap-iife': ['error', 'inside'] },
			},
			{
				extends: ['plugin:astro/recommended'],
				files: ['**/*.astro'],
				parser: 'astro-eslint-parser',
				parserOptions: {
					extraFileExtensions: ['.astro'],
					parser: '@typescript-eslint/parser',
				},
				rules: {
					'import/extensions': 'off',
					'import/no-unresolved': 'off',
					indent: 'off',
				},
			},
			{
				files: ['**/*.ts'],
				parser: '@typescript-eslint/parser',
				rules: {
					'import/extensions': 'off',
					'import/prefer-default-export': 'off',
				},
			},
			{
				files: ['playwright/**/*.ts', 'playwright.config.ts'],
				rules: {
					'import/no-extraneous-dependencies': [
						'error',
						{ devDependencies: true },
					],
				},
			},
		],
	}),
	{
		files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.astro'],
		languageOptions: {
			sourceType: 'module',
			parserOptions: { ecmaVersion: 'latest' },
		},
	},
	{
		files: ['**/*.cjs'],
		languageOptions: { sourceType: 'commonjs' },
	},
	{
		files: [
			'astro.config.mjs',
			'postcss.config.cjs',
			'.release-it.cjs',
			'eslint.config.mjs',
			'bin/**/*.mjs',
		],
		rules: {
			'import/no-unresolved': 'off',
			'import/no-extraneous-dependencies': 'off',
			'global-require': 'off',
			'no-use-before-define': 'off',
			'import/prefer-default-export': 'off',
		},
	},
]
