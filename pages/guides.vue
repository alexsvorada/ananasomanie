<script setup lang="ts">
	definePageMeta({
		layout: 'default',
		title: 'Návody',
		description: 'Herní návody a průvodce',
	})

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
					title: 'Jak použít',
					content: [
						'Vygenerovaný kód si zkopírujte',
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

	const { colors, text, isBold, isItalic, isUnderline, generatedCode, getPreviewColor, addColor, removeColor } = useRGBGenerator()
	const { copied: generatedCodeWasCopied, copyToClipboard: copyCodeToClipboard } = useCopy()
	const { selectedTab, setActiveTab, isTabActive, toggleSection, isSectionOpen } = useTabs({
		defaultTab: guides[0].name,
	})

	const currentGuide = computed(() => guides.find((g) => g.name === selectedTab.value))
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
					@click="setActiveTab(guide.name)"
					class="p-4 rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm transition-all duration-300"
					:class="[
						isTabActive(guide.name)
							? 'bg-primary text-dark ring-2 ring-primary ring-offset-2 ring-offset-dark'
							: 'hover:bg-white/10',
					]">
					<div class="flex flex-col items-center gap-2">
						<Icon :name="guide.icon" class="w-8 h-8" />
						<h3 class="font-bold text-center">{{ guide.name }}</h3>
					</div>
				</button>
			</div>

			<!-- RGB Generator -->
			<div v-if="selectedTab === 'RGB Generátor'" class="mb-12">
				<div class="rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm overflow-hidden">
					<div class="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[22rem]">
						<!-- Left Column (Text Input & Preview) -->
						<div class="space-y-6">
							<!-- Text Input Section -->
							<div>
								<div class="flex items-center justify-between mb-4">
									<h3 class="text-xl font-bold flex items-center gap-2">
										<Icon name="lucide:text" class="w-6 h-6 text-primary" />
										Text
									</h3>
									<div class="flex items-center gap-3">
										<button
											@click="isBold = !isBold"
											class="px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2"
											:class="[
												isBold
													? 'bg-primary text-dark border-primary'
													: 'border-white/10 text-gray-300 hover:bg-white/10',
											]">
											<Icon name="lucide:bold" class="w-4 h-4" />
											<span class="text-sm font-medium">Tučné</span>
										</button>

										<button
											@click="isItalic = !isItalic"
											class="px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2"
											:class="[
												isItalic
													? 'bg-primary text-dark border-primary'
													: 'border-white/10 text-gray-300 hover:bg-white/10',
											]">
											<Icon name="lucide:italic" class="w-4 h-4" />
											<span class="text-sm font-medium">Kurzíva</span>
										</button>

										<button
											@click="isUnderline = !isUnderline"
											class="px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-2"
											:class="[
												isUnderline
													? 'bg-primary text-dark border-primary'
													: 'border-white/10 text-gray-300 hover:bg-white/10',
											]">
											<Icon name="lucide:underline" class="w-4 h-4" />
											<span class="text-sm font-medium">Podtržení</span>
										</button>
									</div>
								</div>
								<input
									v-model="text"
									type="text"
									class="w-full px-4 py-2.5 rounded-lg bg-dark border border-primary/50 text-white transition-all focus:border-primary focus:ring-1 focus:ring-primary outline-none"
									placeholder="Zadejte text pro obarvení..." />
							</div>

							<!-- Preview Section -->
							<div>
								<div class="flex items-center justify-between mb-4">
									<h3 class="text-xl font-bold flex items-center gap-2">
										<Icon name="lucide:eye" class="w-6 h-6 text-primary" />
										Náhled
									</h3>
									<button
										@click="copyCodeToClipboard(generatedCode)"
										:disabled="!text"
										class="relative px-3 py-1.5 rounded-lg border border-primary text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors flex items-center gap-2">
										<Transition
											enter-active-class="transition duration-200 ease-out"
											enter-from-class="transform scale-95 opacity-0"
											enter-to-class="transform scale-100 opacity-100"
											leave-active-class="transition duration-150 ease-in"
											leave-from-class="transform scale-100 opacity-100"
											leave-to-class="transform scale-95 opacity-0">
											<Tooltip v-show="generatedCodeWasCopied" text="Skopírováno" />
										</Transition>
										<Icon :name="generatedCodeWasCopied ? 'lucide:copy-check' : 'lucide:copy'" class="w-4 h-4" />
										<span class="text-sm font-medium">Kopírovat vygenerovaný kód</span>
									</button>
								</div>
								<div
									class="p-4 rounded-lg bg-dark/75 min-h-[3.5rem] flex flex-wrap items-center"
									style="font-family: 'Minecraft', sans-serif">
									<template v-if="text">
										<span
											v-for="(char, index) in text"
											:key="index"
											class="select-none whitespace-pre-wrap break-all"
											:style="{
												color: getPreviewColor(index),
												fontWeight: isBold ? 'bold' : 'normal',
												fontStyle: isItalic ? 'italic' : 'normal',
												textDecoration: isUnderline ? 'underline' : 'none',
											}"
											>{{ char }}</span
										>
									</template>
									<span v-else class="text-light/50 select-none">Náhled textu</span>
								</div>
							</div>
						</div>

						<!-- Right Column (Colors) -->
						<div>
							<div class="flex items-center justify-between mb-4">
								<h3 class="text-xl font-bold flex items-center gap-2">
									<Icon name="lucide:palette" class="w-6 h-6 text-primary" />
									Barvy
								</h3>
								<button
									@click="addColor"
									:disabled="colors.length >= 4"
									class="px-3 py-1.5 rounded-lg border border-primary text-primary disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/10 transition-colors flex items-center gap-2">
									<Icon name="lucide:plus" class="w-4 h-4" />
									<span class="text-sm font-medium">Přidat barvu</span>
								</button>
							</div>

							<div class="space-y-4">
								<div v-for="(color, index) in colors" :key="index" class="relative">
									<div class="flex items-center rounded-lg border border-white/10 bg-dark/50">
										<input
											v-model="colors[index]"
											type="color"
											class="flex-[0.3] m-2 w-full h-8 rounded cursor-pointer"
											:style="{ backgroundColor: colors[index] }" />
										<div class="w-px h-8 bg-white/10"></div>
										<input
											v-model="colors[index]"
											type="text"
											class="flex-[0.7] h-8 px-3 bg-transparent text-sm font-mono focus:outline-none"
											placeholder="#000000" />
									</div>
									<button
										v-if="colors.length > 1"
										@click="removeColor(index)"
										class="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full bg-dark border border-white/10 transition-colors hover:border-primary hover:text-primary"
										title="Odstranit barvu">
										<Icon name="lucide:x" class="w-3.5 h-3.5" />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Guide Content -->
			<div v-if="currentGuide" class="space-y-4">
				<div
					v-for="section in currentGuide.sections"
					:key="section.title"
					class="rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm overflow-hidden">
					<!-- Section Header -->
					<button
						@click="section.title !== 'Jak použít' && toggleSection(section.title)"
						class="w-full p-6 flex items-center justify-between text-left transition-colors"
						:class="section.title !== 'Jak použít' ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default'">
						<h2 class="text-xl font-bold flex items-center gap-2">
							<Icon :name="currentGuide.icon" class="w-6 h-6 text-primary" />
							{{ section.title }}
						</h2>
						<Icon
							v-if="section.title !== 'Jak použít'"
							:name="isSectionOpen(section.title) ? 'lucide:chevron-up' : 'lucide:chevron-down'"
							class="w-6 h-6 transition-transform" />
					</button>

					<!-- Section Content -->
					<div v-show="section.title === 'Jak použít' || isSectionOpen(section.title)" class="p-6 pt-0">
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

<style scoped>
	input[type='color'] {
		border: purple;
	}

	input[type='color']::-moz-color-swatch {
		border: none;
	}

	input[type='color']::-webkit-color-swatch-wrapper {
		padding: 0;
		border-radius: 0;
	}

	input[type='color']::-webkit-color-swatch {
		border: none;
	}

	@font-face {
		font-family: 'Minecraft';
		src: url('/fonts/minecraft.otf') format('opentype');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'Minecraft';
		src: url('/fonts/minecraft-bold.otf') format('opentype');
		font-weight: bold;
		font-style: normal;
	}
</style>
