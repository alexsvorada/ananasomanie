<script setup lang="ts">
	definePageMeta({
		layout: 'default',
		title: 'Ceník',
		description: 'Ceník Slimefun Itemů',
	})

	const {
		selectedCategory,
		modifiedAmounts,
		searchQuery,
		filteredCategories,
		getCategoryDisplayName,
		hasItems,
		isAmountModified,
		calculateTotalPrice,
		updateAmount,
		setActiveCategory,
		isActiveCategory,
		getCategoryItems,
		getMatchingItemsCount,
		isItemMatching,
	} = usePriceList()

	const isMobileNavOpen = ref(false)
	const toggleMobileNav = () => {
		isMobileNavOpen.value = !isMobileNavOpen.value
	}
</script>

<template>
	<section class="min-h-screen px-4 pt-20 pb-32 sm:px-6 lg:px-8 lg:py-32">
		<header class="text-center mb-8 lg:mb-12">
			<h1 class="text-4xl font-bold text-primary md:text-5xl lg:text-6xl">Slimefun Ceník</h1>
		</header>

		<div class="relative max-w-4xl mx-auto">
			<nav
				class="hidden lg:block absolute right-full mr-12 w-[280px] rounded-xl border border-white/10 bg-dark/75 backdrop-blur-sm">
				<div class="p-4 border-b border-white/10">
					<div class="relative">
						<input
							v-model="searchQuery"
							type="text"
							placeholder="Hledat"
							class="w-full p-3 pl-10 rounded-lg bg-dark/75 border border-white/10 placeholder-gray-400 text-white focus:border-white/20 focus:ring-1 focus:ring-white/20 outline-none" />
						<Icon name="lucide:search" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					</div>
				</div>

				<div class="p-4">
					<div class="space-y-2 h-[calc(9*4.5rem)] overflow-y-auto pr-4 -mr-4 custom-scrollbar">
						<button
							v-for="category in filteredCategories"
							:key="category"
							@click="setActiveCategory(category)"
							class="w-full p-4 rounded-xl border transition-all duration-300 flex items-center gap-3"
							:class="[
								isActiveCategory(category)
									? 'bg-primary text-dark border-primary'
									: 'border-white/10 bg-dark/50 backdrop-blur-sm hover:bg-white/10',
							]">
							<Icon name="lucide:package" class="w-6 h-6" />
							<div class="flex-1">
								<span class="font-bold">{{ getCategoryDisplayName(category) }}</span>
								<span v-if="searchQuery && getMatchingItemsCount(category) > 0" class="text-sm block opacity-75">
									Nalezeno položek: {{ getMatchingItemsCount(category) }}
								</span>
							</div>
						</button>

						<div v-if="searchQuery && filteredCategories.length === 0" class="text-center p-4 text-gray-400">
							Žádné výsledky
						</div>
					</div>
				</div>
			</nav>

			<div class="w-full overflow-x-auto">
				<template v-if="selectedCategory">
					<div class="mb-6 lg:mb-8 flex items-center gap-3">
						<Icon name="lucide:list" class="w-6 h-6 lg:w-8 lg:h-8 text-primary" />
						<div class="text-xl lg:text-2xl font-bold text-primary">
							{{ getCategoryDisplayName(selectedCategory) }}
						</div>
					</div>

					<div class="min-w-[280px] lg:min-w-[640px]">
						<div
							class="mb-4 px-2 lg:px-4 grid grid-cols-[1.2fr,60px,70px,70px] lg:grid-cols-[1fr,120px,140px,140px] gap-1 lg:gap-4 text-xs lg:text-sm font-medium text-gray-400">
							<div>Název</div>
							<div class="text-center">Množství</div>
							<div class="text-right">Kus</div>
							<div class="text-right">Celkem</div>
						</div>

						<div v-if="hasItems(selectedCategory)" class="space-y-2">
							<div
								v-for="item in getCategoryItems(selectedCategory)"
								:key="item.name"
								class="grid grid-cols-[1.2fr,60px,70px,70px] lg:grid-cols-[1fr,120px,140px,140px] gap-1 lg:gap-4 items-center p-2 lg:p-4 rounded-lg border transition-all duration-200"
								:class="{
									'border-white/10 bg-dark/75': !isItemMatching(item.name),
									'border-primary/50 bg-dark/90': isItemMatching(item.name),
								}">
								<div class="font-bold text-xs lg:text-base truncate">{{ item.name }}</div>

								<div class="flex justify-center items-center gap-1 lg:gap-2">
									<input
										type="number"
										:value="modifiedAmounts[item.name] ?? item.amount"
										min="1"
										@input="e => updateAmount(item.name, item, (e.target as HTMLInputElement).value)"
										class="w-10 lg:w-16 px-1 lg:px-2 py-0.5 lg:py-1 text-center text-xs lg:text-sm rounded bg-dark border border-white/10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
									<span class="text-gray-400 text-xs lg:text-sm">x</span>
								</div>

								<div class="text-sm lg:text-xl font-bold text-primary text-right">${{ item.price }}</div>

								<div
									class="text-sm lg:text-xl font-bold text-right"
									:class="isAmountModified(item.name) ? 'text-primary' : 'text-gray-600'">
									${{
										isAmountModified(item.name)
											? calculateTotalPrice(item, modifiedAmounts[item.name])
											: calculateTotalPrice(item, item.amount)
									}}
								</div>
							</div>
						</div>

						<div v-else class="text-center p-6 lg:p-8 rounded-xl border border-white/10 bg-dark/50">
							<Icon name="lucide:search-x" class="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-gray-400" />
							<h3 class="text-lg lg:text-xl font-bold mb-2">Žádné výsledky</h3>
							<p class="text-gray-400">
								Nenalezeny žádné položky{{ searchQuery ? ' odpovídající vyhledávání "' + searchQuery + '"' : '' }}
							</p>
						</div>
					</div>
				</template>

				<div v-else class="text-center p-8 lg:p-12 rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm">
					<Icon name="lucide:shopping-cart" class="w-10 h-10 lg:w-12 lg:h-12 mx-auto mb-4 text-gray-400" />
					<h3 class="text-lg lg:text-xl font-bold mb-2">Vyberte kategorii</h3>
					<p class="text-gray-400">Zvolte kategorii ze seznamu pro zobrazení položek</p>
				</div>
			</div>
		</div>

		<button
			@click="toggleMobileNav"
			class="lg:hidden fixed bottom-8 right-8 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-primary text-dark shadow-lg">
			<Icon name="lucide:menu" class="w-6 h-6" />
		</button>

		<Transition
			enter-active-class="transition-transform duration-300 ease-out"
			enter-from-class="translate-y-full"
			enter-to-class="translate-y-0"
			leave-active-class="transition-transform duration-200 ease-in"
			leave-from-class="translate-y-0"
			leave-to-class="translate-y-full">
			<nav v-show="isMobileNavOpen" class="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark border-t border-white/10 p-4">
				<div class="grid grid-cols-2 gap-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
					<button
						v-for="category in filteredCategories"
						:key="category"
						@click="
							() => {
								setActiveCategory(category)
								isMobileNavOpen = false
							}
						"
						class="p-3 rounded-lg border transition-all duration-300 flex items-center gap-2"
						:class="[
							isActiveCategory(category)
								? 'bg-primary text-dark border-primary'
								: 'border-white/10 bg-dark/75 backdrop-blur-sm hover:bg-white/10',
						]">
						<Icon name="lucide:package" class="w-5 h-5" />
						<div class="flex-1">
							<span class="font-medium text-sm">{{ getCategoryDisplayName(category) }}</span>
							<span v-if="searchQuery && getMatchingItemsCount(category) > 0" class="text-xs block opacity-75">
								{{ getMatchingItemsCount(category) }} položek
							</span>
						</div>
					</button>
				</div>
			</nav>
		</Transition>
	</section>
</template>

<style scoped>
	.custom-scrollbar {
		scrollbar-width: thin;
		scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
	}

	.custom-scrollbar::-webkit-scrollbar {
		width: 6px;
	}

	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb {
		background-color: rgba(255, 255, 255, 0.1);
		border-radius: 20px;
	}

	.custom-scrollbar::-webkit-scrollbar-thumb:hover {
		background-color: rgba(255, 255, 255, 0.2);
	}

	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
		appearance: none;
	}
</style>
