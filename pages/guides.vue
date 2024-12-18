<script setup lang="ts">
	interface Guide {
		name: string
		icon: string
		sections: {
			title: string
			content: string | string[]
		}[]
	}

	const guides: Guide[] = [
		{
			name: 'RGB Generátor',
			icon: 'lucide:palette',
			sections: [
				{
					title: 'Nastavení generátoru',
					content: [
						'Vyberte si počet barev (2-4)',
						'Nastavte HEX kódy pro každou barvu',
						'Zadejte text, který chcete obarvit',
						'Vyberte dodatečné formátování (tučné, kurzíva, podtržení)',
					],
				},
				{
					title: 'Jak použít',
					content: [
						'Vygenerovaný kód zkopírujte kliknutím',
						'Vložte do chatu nebo příkazu /nick',
						'Text se zobrazí barevně přímo ve hře',
					],
				},
			],
		},
		{
			name: 'Resource Pack',
			icon: 'lucide:package',
			sections: [
				{
					title: 'Jak zapnout resource pack',
					content: [
						'Při připojení na server potvrďte stažení',
						'V nastavení serveru zapněte resource pack',
						'Počkejte na stažení a načtení',
					],
				},
				{
					title: 'Řešení problémů s prefixy',
					content: ['Otevřete Nastavení (ESC)', 'Přejděte do Language', 'Vypněte Force Unicode Font (OFF)'],
				},
				{
					title: 'Problémy s resource packem?',
					content: [
						'Smažte server ze seznamu a přidejte znovu',
						'Vymažte složku .minecraft/server-resource-packs',
						'Restartujte Minecraft',
						'Kontaktujte podporu na Discordu',
					],
				},
			],
		},
		{
			name: 'Alkohol',
			icon: 'lucide:wine',
			sections: [
				{
					title: 'Vaření alkoholu',
					content: [
						'Postavte kotel (cauldron) nad magma block/oheň',
						'Naplňte vodou a přidejte ingredience',
						'Sledujte čas vaření pomocí hodin',
						'Po uvaření vytáhněte alkohol',
					],
				},
				{
					title: 'Destilování',
					content: [
						'Vložte alkohol do brewing standu',
						'Přidejte 1 glowstone dust',
						'Počkejte na dokončení procesu',
						'Čím déle destilujete, tím lepší kvalita',
					],
				},
				{
					title: 'Zrání v sudu',
					content: [
						'Postavte správný sud podle typu dřeva',
						'Vložte alkohol do sudu',
						'Počkejte 10-20 minut na zrání',
						'Pro skladování používejte truhly, ne sudy',
						'Všechny recepty najdete v /kit brew',
					],
				},
			],
		},
	]

	const selectedGuide = ref(guides[0].name)
	const currentGuide = computed(() => guides.find((g) => g.name === selectedGuide.value))
	const openSections = ref<string[]>([])

	const toggleSection = (title: string) => {
		const index = openSections.value.indexOf(title)
		if (index === -1) {
			openSections.value.push(title)
		} else {
			openSections.value.splice(index, 1)
		}
	}

	const handleGuideClick = (guideName: string) => {
		selectedGuide.value = guideName
		openSections.value = []
	}
</script>

<template>
	<section class="min-h-screen px-4 py-32 sm:px-6 lg:px-8">
		<div class="max-w-7xl mx-auto">
			<!-- Header -->
			<header class="text-center mb-12">
				<h1 class="mb-4 text-5xl font-bold text-primary md:text-6xl">Herní návody</h1>
				<p class="text-xl text-gray-300 md:text-2xl">Průvodce funkcemi a systémy serveru</p>
			</header>

			<!-- Guide Selection -->
			<div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
				<button
					v-for="guide in guides"
					:key="guide.name"
					@click="handleGuideClick(guide.name)"
					class="p-4 rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm transition-all duration-300"
					:class="[
						selectedGuide === guide.name
							? 'bg-primary text-dark ring-2 ring-primary ring-offset-2 ring-offset-dark'
							: 'hover:bg-white/10',
					]">
					<div class="flex flex-col items-center gap-2">
						<Icon :name="guide.icon" class="w-8 h-8" />
						<h3 class="font-bold text-center">{{ guide.name }}</h3>
					</div>
				</button>
			</div>

			<!-- Guide Content -->
			<div v-if="currentGuide" class="space-y-4">
				<div
					v-for="(section, index) in currentGuide.sections"
					:key="section.title"
					class="rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm overflow-hidden">
					<!-- Section Header -->
					<button
						@click="toggleSection(section.title)"
						class="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors">
						<h2 class="text-xl font-bold flex items-center gap-2">
							<Icon :name="currentGuide.icon" class="w-6 h-6 text-primary" />
							{{ section.title }}
						</h2>
						<Icon
							:name="openSections.includes(section.title) ? 'lucide:chevron-up' : 'lucide:chevron-down'"
							class="w-6 h-6 transition-transform" />
					</button>

					<!-- Section Content -->
					<div v-show="openSections.includes(section.title)" class="p-6 pt-0">
						<ul v-if="Array.isArray(section.content)" class="space-y-2">
							<li v-for="item in section.content" :key="item" class="flex items-center gap-2">
								<Icon name="lucide:check" class="w-5 h-5 text-primary flex-shrink-0" />
								<span>{{ item }}</span>
							</li>
						</ul>
						<p v-else>{{ section.content }}</p>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
