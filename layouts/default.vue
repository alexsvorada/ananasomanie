<script setup lang="ts">
	const navItems = [
		{ name: 'DOMŮ', path: '/' },
		{ name: 'DISCORD', path: 'https://discord.gg/W6uWPMz', rel: 'noref noopener', target: '_blank' },
		{ name: 'MAPA', path: 'http://82.208.17.82:29368/map.html', rel: 'noref noopener', target: '_blank' },
		{ name: 'HLASOVÁNÍ', path: '/vote' },
		{ name: 'PRAVIDLA', path: '/rules' },
		{ name: 'NÁVODY', path: '/guides' },
		{ name: 'VIP', path: '/vip' },
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
</script>

<template>
	<div class="flex min-h-screen flex-col bg-dark text-light scroll-smooth">
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
							:rel="item?.rel"
							:target="item?.target"
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
							:rel="item?.rel"
							:target="item?.target"
							class="block px-4 py-2 text-light hover:text-primary transition-colors"
							@click="mobileMenuOpen = false">
							{{ item.name }}
						</NuxtLink>
					</div>
				</div>
			</Transition>
		</nav>

		<main class="flex-grow">
			<!-- Main Content -->
			<slot />
		</main>

		<!-- Footer -->
		<footer class="backdrop-blur-sm py-24">
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
	</div>
</template>
