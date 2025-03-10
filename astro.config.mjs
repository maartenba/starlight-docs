// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from 'starlight-links-validator';
import starlightClientMermaid from '@pasqal-io/starlight-client-mermaid';

// https://astro.build/config
export default defineConfig({
	trailingSlash: 'ignore',
	redirects: {
		"/some-page": "/identityserver/v7/",
		"/some-other-page": "https://duendesoftware.com"
	},
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
				linkedin: 'https://www.linkedin.com/company/duendesoftware/'
			},
			components: {
				Footer: './src/overrides/Footer.astro'
			},
			sidebar: [
					{
						label: 'General information',
						items: [
							{ label: 'Licensing', link: 'https://www.nasa.gov/' },
							{ label: 'Support and Issues', link: 'https://www.nasa.gov/' },
							{ label: 'Security best-practices', link: 'https://www.nasa.gov/' },
							{ label: 'Glossary', link: 'https://www.nasa.gov/' },
						]
					},
					{
						label: 'IdentityServer',
						items: [
							{
								label: 'Getting Started',
								items: [
									{label: 'Licensing', link: 'https://www.nasa.gov/'},
									{label: 'Support and Issues', link: 'https://www.nasa.gov/'},
									{label: 'Security best-practices', link: 'https://www.nasa.gov/'},
									{label: 'Glossary', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							},
							{
								label: '...',
								autogenerate: {directory: 'identityserver/v7'},
								collapsed: true,
							},
							{
								label: 'Release notes',
								items: [
									{label: '7.1', link: 'https://www.nasa.gov/'},
									{label: '7.0', link: 'https://www.nasa.gov/'},
								]
							},
							{
								label: 'Migration',
								autogenerate: {directory: 'identityserver/v7/upgrades'},
								collapsed: true,
							},
							{
								label: 'API reference',
								items: [
									{label: '7.1', link: 'https://www.nasa.gov/'},
									{label: '7.0', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							},
						]
					},
					{
						label: 'Backend-for-Frontend (BFF)',
						items: [
							{
								label: 'Getting Started',
								items: [
									{label: 'Licensing', link: 'https://www.nasa.gov/'},
									{label: 'Support and Issues', link: 'https://www.nasa.gov/'},
									{label: 'Security best-practices', link: 'https://www.nasa.gov/'},
									{label: 'Glossary', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							},
							{
								label: '...',
								autogenerate: {directory: 'identityserver/bff'},
								collapsed: true,
							},
							{
								label: 'Release notes',
								items: [
									{label: '3.0', link: 'https://www.nasa.gov/'},
									{label: '2.0', link: 'https://www.nasa.gov/'},
								]
							},
							{
								label: 'Migration',
								autogenerate: {directory: 'identityserver/v7/upgrades'},
								collapsed: true,
							},
							{
								label: 'API reference',
								items: [
									{label: '3.0', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							},
						]
					},
					{
						label: 'Token Management',
						badge: 'oss',
						items: [
							{
								label: 'Getting Started',
								items: [
									{label: 'Licensing', link: 'https://www.nasa.gov/'},
									{label: 'Support and Issues', link: 'https://www.nasa.gov/'},
									{label: 'Security best-practices', link: 'https://www.nasa.gov/'},
									{label: 'Glossary', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							}
						]
					},
					{
						label: 'IdentityModel',
						badge: 'oss',
						items: [
							{
								label: 'Getting Started',
								items: [
									{label: 'Licensing', link: 'https://www.nasa.gov/'},
									{label: 'Support and Issues', link: 'https://www.nasa.gov/'},
									{label: 'Security best-practices', link: 'https://www.nasa.gov/'},
									{label: 'Glossary', link: 'https://www.nasa.gov/'},
								],
								collapsed: true,
							}
						]
					},
			],
		}),
	],
});
