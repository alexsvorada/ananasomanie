<script setup lang="ts">
	import { useMetadata } from '#build/imports'

	useHead(useMetadata())

	const navItems = [
		{ name: 'DOMŮ', path: '/' },
		{ name: 'DISCORD', path: '/discord' },
		{ name: 'MAPA', path: '/mapa' },
		{ name: 'HLASOVÁNÍ', path: '/hlasovani' },
		{ name: 'PRAVIDLA', path: '/pravidla' },
		{ name: 'VIP', path: '/vip' },
	]

	const features = [
		{ image: '/survival.webp', title: 'Survival', alt: 'Survival Icon' },
		{ image: '/economy.webp', title: 'Ekonomiku', alt: 'Economics Icon' },
		{ image: '/heads.webp', title: 'Hlavy', alt: 'Bee Head Icon' },
		{ image: '/slimefun.webp', title: 'Slimefun', alt: 'Slimefun Icon' },
		{ image: '/skyBlock.webp', title: 'SkyBlock', alt: 'Skyblock Icon' },
		{ image: '/vehicle.webp', title: 'Vozidla', alt: 'Vehicle Icon' },
		{ image: '/special.webp', title: 'Speciální předměty', alt: 'Special Item Icon' },
		{ image: '/community.webp', title: 'Příjemnou komunitu', alt: 'Community Icon' },
	]

	const stats = [
		{ value: '1000+', label: 'Aktivních hráčů' },
		{ value: '50+', label: 'Unikátních událostí' },
		{ value: '24/7', label: 'Online podpora' },
	]

	const mobileMenuOpen = ref<boolean>(false)
	const hasScrolled = ref<boolean>(false)

	onMounted(() => {
		window.addEventListener(
			'scroll',
			() => {
				hasScrolled.value = window.scrollY > 0
			},
			{ passive: true }
		)
	})

	watch(useRoute(), () => {
		mobileMenuOpen.value = false
	})

	const serverAddress = 'mc.ananaso-manie.cz'
	const serverAddressWasCopied = ref<boolean>(false)
	const copyAddress = async () => {
		try {
			await navigator.clipboard.writeText(serverAddress)
			serverAddressWasCopied.value = true

			setTimeout(() => {
				serverAddressWasCopied.value = false
			}, 3000)
		} catch (err) {
			serverAddressWasCopied.value = false
			console.error('Failed to copy the server address')
		}
	}
</script>

<template>
	<main class="min-h-screen bg-dark text-light scroll-smooth">
		<!-- Navigation -->
		<nav role="navigation" aria-label="hlavní navigace" class="fixed w-full z-50 transition-all duration-300">
			<!-- Background that appears on scroll -->
			<div
				class="absolute inset-0 bg-dark/50 backdrop-blur-sm transition-all duration-300"
				:class="hasScrolled ? 'opacity-100' : 'opacity-0'" />

			<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex items-center justify-between h-20">
					<!-- Logo -->
					<NuxtLink to="/" class="flex-shrink-0 hover:opacity-80 transition-opacity">
						<NuxtImg class="h-10" src="/logo.svg" alt="Logo" />
					</NuxtLink>

					<!-- Desktop Navigation -->
					<div class="hidden md:flex items-center gap-8">
						<NuxtLink
							v-for="item in navItems"
							:key="item.path"
							:to="item.path"
							class="relative font-medium text-light hover:text-primary transition-colors group">
							{{ item.name }}
							<span
								class="absolute -bottom-1 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
						</NuxtLink>
					</div>

					<!-- Mobile Menu Button -->
					<button
						class="md:hidden relative z-10 p-2 rounded-lg text-light hover:text-primary transition-colors"
						:class="hasScrolled ? 'bg-dark/50' : ''"
						@click="mobileMenuOpen = !mobileMenuOpen">
						<Icon :name="mobileMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
					</button>
				</div>
			</div>

			<!-- Mobile Menu -->
			<Transition
				enter-active-class="transition duration-200 ease-out"
				enter-from-class="opacity-0 -translate-y-4"
				enter-to-class="opacity-100 translate-y-0"
				leave-active-class="transition duration-150 ease-in"
				leave-from-class="opacity-100 translate-y-0"
				leave-to-class="opacity-0 -translate-y-4">
				<div v-if="mobileMenuOpen" class="absolute top-full left-0 w-full bg-dark/95 backdrop-blur-sm md:hidden">
					<div class="p-4 space-y-4">
						<NuxtLink
							v-for="item in navItems"
							:key="item.path"
							:to="item.path"
							class="block px-4 py-2 text-light hover:text-primary transition-colors"
							@click="mobileMenuOpen = false">
							{{ item.name }}
						</NuxtLink>
					</div>
				</div>
			</Transition>
		</nav>

		<!-- Hero Section -->
		<header class="relative min-h-screen flex items-center justify-center">
			<div class="absolute inset-0 bg-[url('/bg.webp')] bg-cover bg-center blur-lg shadow-2xl"></div>
			<div class="relative z-10 text-center px-4 flex flex-col items-center">
				<NuxtImg class="h-32 mx-auto" src="/logo.svg" alt="Logo" aria-label="Ananaso-Manie logo" />
				<h1 class="text-5xl md:text-6xl font-bold text-primary mb-4">Vítej na našem serveru</h1>
				<p class="text-xl md:text-2xl mb-8">Nejlepší minecraft zážitek začíná zde!</p>

				<!-- New CTA Section -->
				<div class="flex flex-col md:flex-row items-center justify-center gap-6 bg-dark/50 p-8 rounded-xl backdrop-blur-sm">
					<div class="text-left">
						<h2 class="text-2xl font-bold mb-2">Připoj se k nám ještě dnes!</h2>
						<p class="text-gray-300">Zkopíruj adresu serveru a připoj se k tisícům hráčů.</p>
					</div>

					<button
						@click="copyAddress"
						class="relative bg-primary text-dark font-bold h-12 px-8 rounded-lg transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed w-[260px] flex items-center justify-center gap-2 hover:bg-primary/90"
						:aria-label="serverAddressWasCopied ? 'Adresa zkopírována' : 'Kopírovat adresu serveru'"
						:aria-pressed="serverAddressWasCopied">
						<Transition
							enter-active-class="transition duration-200 ease-out"
							enter-from-class="transform scale-95 opacity-0"
							enter-to-class="transform scale-100 opacity-100"
							leave-active-class="transition duration-150 ease-in"
							leave-from-class="transform scale-100 opacity-100"
							leave-to-class="transform scale-95 opacity-0">
							<Tooltip v-show="serverAddressWasCopied" text="Skopirováno" />
						</Transition>

						<span>{{ serverAddress }}</span>
						<Icon :name="serverAddressWasCopied ? 'lucide:copy-check' : 'lucide:copy'" class="w-5 h-5" />
					</button>
				</div>
			</div>
		</header>

		<!-- Features Section -->
		<section aria-labelledby="features-heading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<h2 id="features-heading" class="text-4xl font-bold text-center mb-12">Co u nás najdeš?</h2>
			<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
				<div
					v-for="(feature, index) in features"
					:key="index"
					v-motion
					:initial="{
						opacity: 0,
						y: 50,
					}"
					:visible-once="{
						opacity: 1,
						y: 0,
						transition: {
							delay: index * 50,
							duration: 1000,
						},
					}"
					once
					class="feature bg-white/5 rounded-xl p-6">
					<NuxtImg
						loading="lazy"
						format="webp"
						class="w-full h-fit object-cover rounded-lg mb-4"
						:aria-label="feature.title"
						:src="feature.image"
						:alt="feature.alt" />
					<h2 class="text-xl font-bold">{{ feature.title }}</h2>
				</div>
			</div>
		</section>

		<!-- Stats Section -->
		<section aria-label="Statistiky serveru" class="py-16 bg-white/5">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
					<div v-for="(stat, index) in stats" :key="index" class="p-8">
						<div class="text-5xl font-bold text-primary mb-4">
							{{ stat.value }}
						</div>
						<div class="text-lg text-gray-300">
							{{ stat.label }}
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Footer -->
		<footer class="backdrop-blur-sm py-12 mt-auto">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex flex-col md:flex-row justify-between items-center gap-8">
					<!-- Copyright and Credits -->
					<div class="text-center md:text-left text-gray-400">
						<p>© {{ new Date().getFullYear() }} Ananaso-Manie. Všechna práva vyhrazena.</p>
						<a
							href="https://github.com/alexsvorada"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="GitHub profil vývojáře"
							class="items-center inline-flex gap-2">
							<Icon name="mdi:github" class="w-5 h-5" />
							developed by alex
						</a>
					</div>

					<!-- Contact Info -->
					<div class="text-center md:text-right">
						<p class="text-gray-400 mb-2">Potřebujete pomoct? Napište nám:</p>
						<a
							href="mailto:email@ananaso-manie.cz"
							aria-label="Kontaktní email"
							class="text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2">
							<Icon name="lucide:mail" class="w-5 h-5" />
							email@ananaso-manie.cz
						</a>
					</div>
				</div>
			</div>
		</footer>
	</main>
</template>

<style>
	:root {
		--primary: #ffb23f;
		--dark: #1a1a1a;
		--light: #f5f5f5;
		--accent: #ff6b6b;
	}

	body {
		font-family: 'Figtree', sans-serif;
	}
</style>
