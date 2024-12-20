<script setup lang="ts">
	definePageMeta({
		layout: 'default',
		title: 'Hlasování',
		description: 'Hlasování na MC Server listech',
	})

	const { nickname, isLoading, votingSites, fetchVoteData } = useVote()
	fetchVoteData()
</script>

<template>
	<section class="min-h-screen px-4 sm:px-6 lg:px-8 py-32">
		<div class="max-w-7xl mx-auto">
			<header class="text-center mb-12">
				<h1 class="text-5xl md:text-6xl font-bold text-primary mb-4">Hlasování</h1>
			</header>
			<div v-if="isLoading" class="text-center py-8">
				<div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto"></div>
			</div>
			<template v-else>
				<div class="max-w-md mx-auto mb-12">
					<label for="nickname" class="block text-xl font-medium mb-2">Herní jméno</label>
					<input
						v-model="nickname"
						type="text"
						id="nickname"
						class="w-full px-4 py-2 bg-dark/50 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors backdrop-blur-sm"
						placeholder="Zadejte své herní jméno" />
				</div>
				<div class="grid md:grid-cols-2 gap-8">
					<div
						v-for="site in votingSites"
						:key="site.name"
						class="bg-dark/50 rounded-xl p-8 backdrop-blur-sm border border-white/10">
						<div class="flex justify-between items-center mb-6">
							<h2 class="text-2xl font-bold">{{ site.name }}</h2>
							<button
								@click="site.voteFunction"
								:disabled="!nickname"
								class="bg-primary text-dark px-8 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
								Hlasovat
							</button>
						</div>
						<div class="grid grid-cols-1 gap-4 mb-6">
							<div class="text-center p-4 bg-white/5 rounded-lg">
								<div class="text-gray-300 mb-1">Počet hlasů</div>
								<div class="text-2xl font-bold text-primary">{{ site.votes }}</div>
							</div>
						</div>
						<div class="border-t border-white/10 pt-6">
							<h3 class="text-xl font-bold mb-4">Top 5 hlasujících</h3>
							<div class="space-y-3">
								<div
									v-for="(voter, index) in site.topVoters.value"
									:key="index"
									class="flex items-center justify-between bg-white/5 rounded-lg p-4 transition-colors hover:bg-white/10">
									<div class="flex items-center gap-3">
										<NuxtImg
											:src="`https://mc-heads.net/head/${voter.nickname}`"
											:alt="voter.nickname"
											class="w-10 h-10 rounded"
											loading="lazy"
											quality="80" />
										<span class="font-medium">{{ voter.nickname }}</span>
									</div>
									<span class="font-bold text-primary">{{ voter.votes }}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</template>
		</div>
	</section>
</template>
