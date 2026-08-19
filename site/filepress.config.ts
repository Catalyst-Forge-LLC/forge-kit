import { defineFilepressConfig } from 'getfilepress';

const github = 'https://github.com/Catalyst-Forge-LLC/forge-kit';

export default defineFilepressConfig({
	title: 'ForgeTrail',
	description:
		'A persistent development system for building software with AI agents. Forge the path. Keep the trail.',
	url: 'https://forgetrail.dev',
	author: 'Catalyst Forge LLC',
	tagline: 'Forge the path. Keep the trail.',
	lede: 'A persistent development system for building software with AI agents.',
	homePage: 'home',
	logo: '/logo.svg',
	ogImage: '/logo.svg',
	nav: [
		{ label: 'Home', href: '/' },
		{ label: 'Try', href: '/try' },
		{ label: 'How it works', href: '/how-it-works' },
		{ label: 'Writing', href: '/writing' },
		{ label: 'About', href: '/about' },
		{ label: 'GitHub', href: github, icon: 'github' }
	],
	footerLinks: [
		{ label: 'Try', href: '/try' },
		{ label: 'RSS', href: '/rss.xml' },
		{ label: 'GitHub', href: github, icon: 'github' },
		{ label: 'Catalyst Forge', href: 'https://catalystforge.com' }
	],
	topics: [
		{ label: 'Getting started', tag: 'getting-started' },
		{ label: 'Methodology', tag: 'methodology' }
	]
});
