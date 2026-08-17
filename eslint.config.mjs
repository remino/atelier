import js from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import astroPlugin from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	{
		ignores: ['**/.astro/**', '**/dist/**', '**/node_modules/**', 'deploy/**'],
	},
	js.configs.recommended,
	...tseslint.configs.recommended,
	...astroPlugin.configs['flat/recommended'],
	{
		files: ['**/*.js', '**/*.mjs', '**/*.cjs', '**/*.ts', '**/*.tsx'],
		languageOptions: {
			parserOptions: {
				project: false,
				projectService: false,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: ['**/*.{js,mjs,cjs}'],
		languageOptions: {
			globals: globals.node,
			sourceType: 'module',
			parserOptions: {
				project: false,
				projectService: false,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		files: [
			'packages/*/src/lib/**/*.ts',
			'apps/**/src/assets/**/*.{js,ts}',
			'apps/**/src/sites/**/*.{js,ts}',
		],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ['tests/**/*.js'],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node, ...globals.vitest },
		},
	},
	{
		files: ['apps/**/*.astro', 'packages/**/*.astro'],
		languageOptions: {
			parser: astroParser,
			parserOptions: {
				extraFileExtensions: ['.astro'],
				parser: tseslint.parser,
				project: false,
				projectService: false,
				tsconfigRootDir: import.meta.dirname,
			},
			globals: { ...globals.browser, ...globals.node },
		},
	},
	{
		rules: {
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [
				'warn',
				{ argsIgnorePattern: '^_', ignoreRestSiblings: true },
			],
		},
	},
	prettier,
]
