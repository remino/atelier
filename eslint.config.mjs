import js from '@eslint/js'
import astroParser from 'astro-eslint-parser'
import astroPlugin from 'eslint-plugin-astro'
import prettier from 'eslint-config-prettier'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default [
	{
		ignores: [
			'**/.astro/**',
			'**/.build/**',
			'**/build/**',
			'**/dist/**',
			'**/node_modules/**',
			'**/deploy/**',
			'**/bits/**',
			'**/public/**',
			'packages/scrollerful/remarqueeble/**',
		],
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
			'packages/*/src/assets/**/*.{js,ts}',
			'packages/*/src/lib/**/*.{js,ts}',
			'apps/**/src/assets/**/*.{js,ts}',
			'apps/**/src/sites/**/*.{js,ts}',
		],
		languageOptions: { globals: globals.browser },
	},
	{
		files: ['tests/**/*.js', 'packages/*/spec/**/*.js'],
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				...globals.vitest,
				...globals.jasmine,
				jasmine: 'readonly',
			},
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
		files: ['**/*.cjs'],
		languageOptions: { sourceType: 'commonjs' },
		rules: { '@typescript-eslint/no-require-imports': 'off' },
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
