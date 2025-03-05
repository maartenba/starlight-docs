// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'ignore',
	integrations: [
		starlight({
			plugins: [
				starlightClientMermaid({ /* options */ }),
				starlightLinksValidator({
					errorOnFallbackPages: false,
					errorOnInconsistentLocale: true,
				})
			],
			title: 'Duende Software Docs',
			logo: {
				light: './src/assets/duende-logo.png',
				dark: './src/assets/duende-logo-dark.png',
				replacesTitle: true,
			},
			lastUpdated: true,
			editLink: {
				baseUrl: 'https://github.com/DuendeSoftware/docs.duendesoftware.com/edit/main/docs/',
			},
			social: {
				github: 'https://github.com/DuendeSoftware',
				blueSky: 'https://bsky.app/profile/duendesoftware.com',
				linkedin: 'https://www.linkedin.com/company/duendesoftware/',
				'x.com': 'https://x.com/DuendeIdentity',
			},
			components: {
				Footer: './src/overrides/Footer.astro'
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
							label: 'v3',
							autogenerate: { directory: 'bff/v3' },
							collapsed: true
						},
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
