<script setup lang="ts">
	definePageMeta({
		layout: 'default',
		title: 'VIP',
		description: 'Detaily pro koupi VIP',
	})

	interface Tier {
		name: string
		image: string
		benefits: string[]
		commands: string[]
		price: {
			czk: number
			eur: number
			duration?: string
		}
	}

	const tiers: Tier[] = [
		{
			name: 'VIP',
			image: '/vip.webp',
			benefits: [
				'🧪 Při úmrtí zůstanou zkušenosti',
				'🎨 Barevné psaní v chatu a /msg',
				'💥 Tanky z /prostredky střílí pomocí firecharge',
				'💣 Možnost pouštět TNT z letadel',
				'🏠 6 /sethome najednou',
				'🏰 5 residencí',
			],
			commands: [
				'🧯 /ext - Uhašení',
				'⚔️ /kit vip - Diamantové nástroje',
				'🎆 /kit firework - 60 rachejtlí',
				'🌤️ /weather - Nastavení počasí',
				'🎩 /hat - Předmět na hlavu',
				'🌟 /tpahere - Teleport hráče k sobě',
				'❤️ /heal - Léčení (30s cooldown)',
				'🍖 /feed - Nasycení (30s cooldown)',
				'💧 /drink - Doplnění vody (30s cooldown)',
				'🔨 /fix - Oprava předmětu v ruce',
				'🦅 /fly - Létání',
				'📦 /workbench - Virtuální crafting',
				'🎁 /enderchest - Virtuální enderchest',
				'💰 /ah - Rozšířený aukční dům',
			],
			price: { czk: 50, eur: 2, duration: '3 měsíce' },
		},
		{
			name: 'ExtraVIP',
			image: '/evip.webp',
			benefits: [
				'⭐ Všechny výhody VIP',
				'✏️ Možnost přejmenování a přepsání lore předmětu',
				'📝 Možnost změny jména ve hře (max 3x)',
				'🎨 Barevné psaní na cedule',
				'🏠 9 /sethome najednou',
				'🏰 7 residencí',
				'🎯 1 hráčský warp',
			],
			commands: [
				'👀 /invsee <Hráč> - Náhled do inventáře',
				'⚡ /speed - Změna rychlosti létání/chození',
				'🎁 /kit evip - Vylepšené vybavení',
				'🔧 /fix all - Oprava všech předmětů',
				'🔇 /ignore - Ignorování hráčů',
				'🐾 /mpet - Vlastní mazlíček',
				'💎 /ah - Více slotů v aukci než VIP',
			],
			price: { czk: 99, eur: 4, duration: '3 měsíce' },
		},
		{
			name: 'MegaVIP',
			image: '/mvip.webp',
			benefits: ['👑 Všechny výhody VIP a ExtraVIP', '🏠 12 /sethome najednou', '🏰 9 residencí', '🎯 2 hráčské warpy'],
			commands: [
				'👻 /vanish - Neviditelnost',
				'🥚 /spawner - Změna typu spawneru',
				'💫 /kit mvip - Prémiové vybavení',
				'🐣 /kit spawner - Přístup ke spawnerům',
				'🗑️ /ci - Vymazání inventáře',
				'🚫 /tptoggle - Kontrola teleportace',
				'😇 /god - Nesmrtelnost',
				'🏪 /vs - Virtuální stanice',
				'💎 /ah - Více slotů v aukci než EVIP',
			],
			price: { czk: 149, eur: 6, duration: '3 měsíce' },
		},
		{
			name: 'Boss',
			image: '/boss.webp',
			benefits: [
				'👑 Všechny výhody VIP, ExtraVIP a MegaVIP',
				'🏠 27 /sethome najednou',
				'🏰 11 residencí',
				'⚡ 10% bonus na XP u jobs',
				'🎯 3 hráčské warpy',
			],
			commands: [
				'✨ /nick - Změna jména v chatu',
				'🎁 /kit boss - Exkluzivní vybavení',
				'✏️ /rename - Přejmenování předmětů',
				'📝 /lore - Úprava popisků předmětů',
				'💎 /ah - Nejvíce slotů v aukci',
			],
			price: { czk: 199, eur: 8, duration: '3 měsíce' },
		},
		{
			name: 'Klíče',
			image: '/keys.webp',
			benefits: ['🔑 3 klíče k PREMIUM-CRATE'],
			commands: [],
			price: { czk: 30, eur: 1.2 },
		},
		{
			name: 'Peníze',
			image: '/money.webp',
			benefits: ['💰 60.000 herních peněz'],
			commands: [],
			price: { czk: 30, eur: 1.2 },
		},
	]

	const selectedTier = ref<string>('VIP')
	const currentTier = computed(() => tiers.find((t) => t.name === selectedTier.value))
</script>

<template>
	<section class="min-h-screen px-4 py-32 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<header class="text-center mb-12">
				<h1 class="mb-4 text-5xl font-bold text-primary md:text-6xl">VIP Výhody</h1>
				<p class="text-xl text-gray-300 md:text-2xl">Podpoř nás a získej speciální výhody!</p>
			</header>
			<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
				<button
					v-for="tier in tiers"
					:key="tier.name"
					@click="selectedTier = tier.name"
					class="p-4 rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm transition-all duration-300"
					:class="[
						selectedTier === tier.name
							? 'bg-primary text-dark ring-2 ring-primary ring-offset-2 ring-offset-dark'
							: 'hover:bg-white/10',
					]">
					<NuxtImg :src="tier.image" :alt="tier.name" class="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2" loading="lazy" />
					<h3 class="font-bold text-center text-sm sm:text-base">{{ tier.name }}</h3>
				</button>
			</div>
			<div class="mb-8 text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
				<p class="text-2xl font-bold">
					{{ currentTier?.price.czk }}Kč / {{ currentTier?.price.eur }}€
					<span class="text-gray-300 text-lg">
						{{ currentTier?.price.duration ? `za ${currentTier.price.duration}` : 'jednorázově' }}
					</span>
				</p>
			</div>
			<div class="grid md:grid-cols-2 gap-8">
				<div class="space-y-8">
					<div class="rounded-xl border border-white/10 bg-dark/50 p-6 backdrop-blur-sm">
						<h2 class="mb-4 text-xl font-bold flex items-center gap-2">
							<Icon name="lucide:check-circle" class="text-primary w-6 h-6" />
							Výhody
						</h2>
						<ul class="space-y-3 text-gray-300">
							<li v-for="benefit in currentTier?.benefits" :key="benefit" class="flex items-center gap-2">
								<span>{{ benefit }}</span>
							</li>
						</ul>
					</div>
					<div v-if="currentTier?.commands.length" class="rounded-xl border border-white/10 bg-dark/50 p-6 backdrop-blur-sm">
						<h2 class="mb-4 text-xl font-bold flex items-center gap-2">
							<Icon name="lucide:terminal" class="text-primary w-6 h-6" />
							Příkazy
						</h2>
						<ul class="space-y-3 text-gray-300">
							<li v-for="command in currentTier?.commands" :key="command" class="flex items-center gap-2">
								<span>{{ command }}</span>
							</li>
						</ul>
					</div>
				</div>
				<div class="rounded-xl border border-white/10 bg-dark/50 p-6 backdrop-blur-sm">
					<h2 class="mb-4 text-xl font-bold flex items-center gap-2">
						<Icon name="lucide:circle-dollar-sign" class="text-primary w-6 h-6" />
						Platební možnosti
					</h2>
					<div class="space-y-6">
						<NuxtLink
							href="https://www.fakaheda.eu/prezentace-serveru/288830/vip"
							target="_blank"
							rel="noopener noreferrer"
							class="group block w-full p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-300">
							<div class="flex items-center justify-between">
								<div>
									<h3 class="font-bold mb-2 flex items-center gap-2">
										<Icon name="lucide:credit-card" class="w-5 h-5 text-primary" />
										PaySafeCard
									</h3>
									<p class="text-gray-300 text-sm flex items-center gap-2">
										<Icon name="lucide:monitor" class="w-4 h-4" />
										Přes Fakahedu
									</p>
								</div>
								<Icon
									name="lucide:arrow-right"
									class="w-5 h-5 text-primary transform transition-transform duration-300 group-hover:translate-x-1" />
							</div>
						</NuxtLink>
						<NuxtLink
							:href="useRuntimeConfig().public.discordLink"
							target="_blank"
							rel="noopener noreferrer"
							class="group block w-full p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-all duration-300">
							<div class="flex items-center justify-between">
								<div>
									<h3 class="font-bold mb-2 flex items-center gap-2">
										<Icon name="lucide:wallet" class="w-5 h-5 text-primary" />
										Paypal/Bankovní převod
									</h3>
									<p class="text-gray-300 text-sm flex items-center gap-2">
										<Icon name="lucide:message-circle" class="w-4 h-4" />
										Kontaktem přes Discord
									</p>
								</div>
								<Icon
									name="lucide:arrow-right"
									class="w-5 h-5 text-primary transform transition-transform duration-300 group-hover:translate-x-1" />
							</div>
						</NuxtLink>
						<div class="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
							<p class="text-red-400 text-sm text-center flex items-center justify-center gap-2">
								<Icon name="lucide:alert-triangle" class="w-4 h-4" />
								Vracení peněz není možné!
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
