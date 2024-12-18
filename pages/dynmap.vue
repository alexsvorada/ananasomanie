<template>
	<section class="min-h-screen px-4 py-32 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<header class="mb-12 text-center">
				<h1 class="mb-4 text-5xl font-bold text-primary md:text-6xl">Mapa serveru</h1>
				<p class="text-xl text-gray-300 md:text-2xl">Prohlédni si náš svět v reálném čase</p>
			</header>

			<!-- Main Container -->
			<div class="flex flex-col items-center xl:relative">
				<!-- Map -->
				<div
					v-motion
					:initial="{ opacity: 0 }"
					:visible-once="{
						opacity: 1,
						transition: {
							duration: 500,
						},
					}"
					class="h-[400px] rounded-xl border border-white/10 bg-dark/50 p-4 backdrop-blur-sm md:h-[450px] md:w-[600px] lg:h-[750px] lg:w-[1150px]">
					<iframe
						:src="String(useRuntimeConfig().public.dynmapLink)"
						class="h-full w-full rounded-lg"
						loading="lazy"
						title="Server Dynmap"></iframe>
				</div>

				<!-- Tips Container - Below on mobile, Absolute on XL -->
				<div class="mt-8 space-y-8 md:w-[600px] lg:w-[800px] xl:absolute xl:right-full xl:top-0 xl:mt-0 xl:mr-8 xl:w-80">
					<!-- Controls Section -->
					<div
						v-motion
						:initial="{ opacity: 0, x: -20 }"
						:visible-once="{
							opacity: 1,
							x: 0,
							transition: {
								duration: 500,
							},
						}"
						class="rounded-xl border border-white/10 bg-dark/50 p-6 backdrop-blur-sm">
						<h2 class="mb-4 text-xl font-bold">Ovládání mapy</h2>
						<ul class="space-y-3 text-gray-300">
							<li class="flex items-center gap-2">
								<span class="text-xl">🖱️</span>
								<span>Kolečkem myši přiblížíš/oddálíš mapu</span>
							</li>
							<li class="flex items-center gap-2">
								<span class="text-xl">👆</span>
								<span>Kliknutím a tažením se pohybuješ po mapě</span>
							</li>
							<li class="flex items-center gap-2">
								<span class="text-xl">👥</span>
								<span>V pravém menu najdeš online hráče</span>
							</li>
						</ul>
					</div>

					<!-- Tips Section -->
					<div
						v-motion
						:initial="{ opacity: 0, x: -20 }"
						:visible-once="{
							opacity: 1,
							x: 0,
							transition: {
								delay: 100,
								duration: 500,
							},
						}"
						class="rounded-xl border border-white/10 bg-dark/50 p-6 backdrop-blur-sm">
						<h2 class="mb-4 text-xl font-bold">Tipy</h2>
						<ul class="space-y-3 text-gray-300">
							<li class="flex items-center gap-2">
								<span class="text-xl">🌍</span>
								<span>Můžeš přepínat mezi různými světy</span>
							</li>
							<li class="flex items-center gap-2">
								<span class="text-xl">🎯</span>
								<span>Kliknutím na hráče ho začneš sledovat</span>
							</li>
							<li class="flex items-center gap-2">
								<span class="text-xl">🌙</span>
								<span>V noci se mapa automaticky přepne do nočního režimu</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
