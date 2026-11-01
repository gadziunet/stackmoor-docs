// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://docs.stackmoor.dev',
	integrations: [
		starlight({
			title: 'Stackmoor Docs',
			description: 'Documentation for Stackmoor – a self-hosted Docker Compose panel with backups and local domains.',
			logo: { src: './src/assets/logo.svg', alt: 'Stackmoor' },
			favicon: '/favicon.svg',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/gadziunet/stackmoor' }],
			editLink: { baseUrl: 'https://github.com/gadziunet/stackmoor-docs/edit/main/' },
			lastUpdated: true,
			// English at the root (/install/…), Polish under /pl/.
			defaultLocale: 'root',
			locales: {
				root: { label: 'English', lang: 'en' },
				pl: { label: 'Polski', lang: 'pl' },
			},
			head: [
				{ tag: 'link', attrs: { rel: 'preload', href: '/fonts/IBMPlexSans-Regular.woff', as: 'font', type: 'font/woff', crossorigin: '' } },
			],
			sidebar: [
				'about',
				{
					label: 'Getting started',
					translations: { pl: 'Pierwsze kroki' },
					items: ['start/install', 'start/unraid', 'start/first-stack'],
				},
				{
					label: 'Guides',
					translations: { pl: 'Poradniki' },
					items: [
						'guides/automatic-volumes',
						'guides/local-domains',
						'guides/proxy',
						'guides/vpn',
						'guides/panel-address',
						'guides/updates',
						'guides/server',
					],
				},
				{
					label: 'Backups',
					translations: { pl: 'Kopie zapasowe' },
					items: ['backups/setup', 'backups/retention', 'backups/restore', 'backups/databases'],
				},
				{
					label: 'Help',
					translations: { pl: 'Pomoc' },
					items: ['help/troubleshooting', 'help/faq'],
				},
				{ label: 'stackmoor.dev', link: 'https://stackmoor.dev', attrs: { target: '_blank' } },
			],
		}),
	],
});
