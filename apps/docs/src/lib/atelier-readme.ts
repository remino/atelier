import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { createMarkdownProcessor } from '@astrojs/markdown-remark'

const readmePath = resolve(process.cwd(), '../../README.md')
const licencePath = resolve(process.cwd(), '../../LICENSE')
const markdownProcessor = await createMarkdownProcessor()

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^\p{L}\p{N}\s-]/gu, '')
		.replace(/\s+/g, '-')
}

export interface ReadmeHeading {
	level: number
	label: string
	href: string
}

export async function getAtelierReadme() {
	const markdown = await readFile(readmePath, 'utf8')
	const packageSection =
		/<!-- atelier-packages -->[\s\S]*?<!-- \/atelier-packages -->/
	const packageMatch = packageSection.exec(markdown)
	const beforePackages = packageMatch
		? markdown
				.slice(0, packageMatch.index)
				.replace(/<!-- mtoc-start -->[\s\S]*?<!-- mtoc-end -->\s*/m, '')
				.replace(/## Packages[\s\S]*$/, '')
		: markdown
	const afterPackages = packageMatch
		? markdown.slice(packageMatch.index + packageMatch[0].length)
		: ''
	const headings = [...markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)].map(match => {
		const label = match[2].trim()
		return {
			level: match[1].length,
			label,
			href: `#${slugify(label)}`,
		}
	})

	const [beforeResult, afterResult] = await Promise.all([
		markdownProcessor.render(beforePackages),
		markdownProcessor.render(afterPackages),
	])

	return {
		afterPackages: afterResult.code,
		beforePackages: beforeResult.code,
		headings,
	}
}

export async function getAtelierLicence() {
	const licence = await readFile(licencePath, 'utf8')
	return (
		await markdownProcessor.render(
			`# Licence\n\n${licence.replace(/^ISC License\s*/, '')}`
		)
	).code
}
