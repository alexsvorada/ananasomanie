// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-11-01',
	devtools: { enabled: true },
	runtimeConfig: {
		craftlistToken: '',
		minecraftServeryToken: '',
		public: {
			discordLink: '',
			dynmapLink: '',
		},
	},
	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
	modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxt/icon', '@vueuse/motion/nuxt', '@nuxt/fonts'],
	tailwindcss: {
		config: {
			theme: {
				extend: {
					colors: {
						primary: '#FFB23F',
						dark: '#1A1A1A',
						light: '#F5F5F5',
						accent: '#FF6B6B',
					},
				},
			},
		},
	},
})
