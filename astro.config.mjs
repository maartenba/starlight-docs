// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightVersions from 'starlight-versions';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid'

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
				linkedin: 'https://www.linkedin.com/company/duendesoftware/',
				'x.com': 'https://x.com/DuendeIdentity',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'IdentityServer',
					autogenerate: { directory: 'identityserver' },
				},
				{
					label: 'Backend-for-Frontend',
					autogenerate: { directory: 'bff' },
				},
				{
					label: 'Open-source',
					autogenerate: { directory: 'foss' },
				},
			],
		}),
	],
});
