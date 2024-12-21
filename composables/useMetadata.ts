export const useMetadata = () => {
	return {
		title: 'Ananaso-Manie.cz - Minecraft Server',
		titleTemplate: '%s | Nejlepší Minecraft Zážitek',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				name: 'description',
				content:
					'Nejlepší minecraft zážitek začíná zde! Připoj se k tisícům hráčů na našem Minecraft serveru s vlastními módy, survival, ekonomikou a přátelskou komunitou.',
			},
			{ name: 'keywords', content: 'minecraft server, minecraft, gaming, survival, skyblock, slimefun, česky minecraft server' },
			{ name: 'author', content: 'Ananaso-Manie.cz' },
			{ name: 'theme-color', content: '#ffb23f' },

			{ property: 'og:type', content: 'website' },
			{ property: 'og:url', content: 'https://ananaso-manie.cz' },
			{ property: 'og:title', content: 'Ananaso-Manie.cz - Minecraft Server' },
			{
				property: 'og:description',
				content: 'Nejlepší minecraft zážitek začíná zde! Připoj se k tisícům hráčů na našem Minecraft serveru.',
			},
			{ property: 'og:image', content: '/og-image.jpg' },
			{ property: 'og:image:width', content: '1200' },
			{ property: 'og:image:height', content: '630' },
			{ property: 'og:locale', content: 'cs_CZ' },
			{ property: 'og:site_name', content: 'Ananaso-Manie.cz' },

			{ name: 'twitter:card', content: 'summary_large_image' },
			{ name: 'twitter:url', content: 'https://ananaso-manie.cz' },
			{ name: 'twitter:title', content: 'Ananaso-Manie.cz - Minecraft Server' },
			{
				name: 'twitter:description',
				content: 'Nejlepší minecraft zážitek začíná zde! Připoj se k tisícům hráčů na našem Minecraft serveru.',
			},
			{ name: 'twitter:image', content: '/og-image.jpg' },

			{ name: 'format-detection', content: 'telephone=no' },
			{ name: 'robots', content: 'index, follow' },
			{ name: 'canonical', content: 'https://ananaso-manie.cz' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },

			{ rel: 'canonical', href: 'https://ananaso-manie.cz' },
		],
		script: [
			{
				type: 'application/ld+json',
				children: JSON.stringify({
					'@context': 'https://schema.org',
					'@type': 'WebSite',
					name: 'Ananaso-Manie.cz',
					url: 'https://ananaso-manie.cz',
					description: 'Nejlepší minecraft zážitek začíná zde!',
					potentialAction: {
						'@type': 'JoinAction',
						target: 'mc.ananaso-manie.cz',
						actionStatus: 'PotentialActionStatus',
						name: 'Připojit se k serveru',
					},
				}),
			},
		],
	}
}
