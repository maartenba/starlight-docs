// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightVersions from 'starlight-versions';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';
import {readdir, readFile} from "fs/promises";
import matter from "gray-matter";

async function autogenSections() {
	const sections = (
		await readdir("./src/content/docs/", {
			withFileTypes: true,
		})
	)
		.filter((path) => path.isDirectory())
		.flatMap(async (path) => {
			const subdirectoryPath = `./src/content/docs/${path.name}/`;
			const subdirectories = (
				await readdir(subdirectoryPath, {withFileTypes: true})
			)
				.filter((subPath) => subPath.isDirectory())
				.map(async (subPath) => {
					const indexPath = `${subdirectoryPath}${subPath.name}/index.md`;
					let starlightOrder = Infinity;
					let label = `${path.name}/${subPath.name}`;

					try {
						const fileContent = await readFile(indexPath, "utf-8");
						const frontmatter = matter(fileContent).data;

						if (frontmatter && frontmatter["starlight"] && frontmatter["starlight"]["order"]) {
							starlightOrder = frontmatter["starlight"]["order"];
						}

						if (frontmatter && frontmatter["title"]) {
							label = frontmatter["title"];
						}
					} catch (err) {
						console.warn(`Could not read or parse frontmatter from ${indexPath}:`, err);
					}

					return {
						label: label,
						order: starlightOrder,
						autogenerate: {
							directory: `${path.name}/${subPath.name}`,
							collapsed: true,
						},
					};
				});

			// Return all subdirectories mapped to promises
			return Promise.all(subdirectories);
		});

	// Resolve all nested promises and flatten the result
	const resolvedSections = (await Promise.all(sections)).flat();

	return resolvedSections
		.sort((a, b) => a.order - b.order)
		.map(({order, ...data}) => data);
}

const sidebar = await autogenSections();

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			plugins: [
				starlightClientMermaid({ /* options */ }),
				starlightLinksValidator(),
				/*starlightVersions({
					versions: [{ slug: '1.0' }],
				}),*/
			],
			title: 'Duende Software Docs',
			logo: {
				src: './src/assets/duende-logo.png',
				replacesTitle: true,
			},
			editLink: {
				baseUrl: 'https://github.com/DuendeSoftware/docs.duendesoftware.com/edit/main/docs/',
			},
			social: {
				github: 'https://github.com/DuendeSoftware',
				blueSky: 'https://bsky.app/profile/duendesoftware.com',
				linkedin: 'https://www.linkedin.com/company/duendesoftware/',
				'x.com': 'https://x.com/DuendeIdentity',
			},
			sidebar: [
				{
					label: 'IdentityServer',
					items: [
						{
							label: 'v7',
							autogenerate: { directory: 'identityserver/v7' },
						},
						{
							label: 'v6',
							autogenerate: { directory: 'identityserver/v6' },
							collapsed: true
						},
						{
							label: 'v5',
							autogenerate: { directory: 'identityserver/v5' },
							collapsed: true
						},
					]
				},
				{
					label: 'Backend-for-Frontend (BFF)',
					items: [
						{
							label: 'v2',
							autogenerate: { directory: 'bff/v2' },
							collapsed: true
						},
					]
				},
				{
					label: 'Open-source',
					autogenerate: { directory: 'foss' },
					collapsed: true
				},
			],
		}),
	],
});
