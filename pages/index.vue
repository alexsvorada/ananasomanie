<script setup lang="ts">
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
	<div>
		<BackgroundImage />
		<!-- Hero Section -->
		<header class="min-h-screen flex items-center justify-center">
			<div class="z-10 text-center flex flex-col items-center">
				<NuxtImg class="h-32" src="/logo.svg" alt="Logo" aria-label="Ananaso-Manie logo" />
				<h1 class="text-5xl md:text-6xl font-bold text-primary mt-16 mb-4">Vítej na našem serveru</h1>
				<p class="text-xl md:text-2xl mb-8">Nejlepší minecraft zážitek začíná zde!</p>

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
							<Tooltip v-show="serverAddressWasCopied" text="Skopírováno" />
						</Transition>

						<span>{{ serverAddress }}</span>
						<Icon :name="serverAddressWasCopied ? 'lucide:copy-check' : 'lucide:copy'" class="w-5 h-5" />
					</button>
				</div>
			</div>
		</header>

		<!-- Features Section -->
		<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
			<h2 class="text-4xl font-bold text-center mb-12">Co u nás najdeš?</h2>
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
							delay: index * 10,
							duration: 1000,
						},
					}"
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
	</div>
</template>
