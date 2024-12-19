<script setup lang="ts">
	definePageMeta({
		layout: 'default',
		title: 'Pravidla',
		description: 'Herní a komunitní pravidla',
	})

	const rules = [
		{
			icon: '🚫',
			title: 'Hacky a autoclickery jsou zakázané',
			description: 'Podvádění u nás nemá místo. Hraj fér a bez zakázaných nástrojů!',
		},
		{
			icon: '🐞',
			title: 'Bugy jsou pro nahlášení, ne pro zneužití',
			description: 'Pokud objevíš chybu, informuj Admin Tým, aby ji mohl řešit. Zneužití bugů není tolerováno.',
		},
		{
			icon: '💬',
			title: 'Udržuj slušnost a nezahlcuj chat',
			description: 'Vyvaruj se žebrání, nadměrné vulgaritě a spamu.',
		},
		{
			icon: '🏗️',
			title: 'Respektuj cizí stavby a prostředí',
			description:
				'Nenič cizí stavby a nepoškozuj krajinu nesmyslnými úpravami. Nástroje na těžbu 3×3 bloků používej na /warp tezba.',
		},
		{
			icon: '⚖️',
			title: 'Dodržuj pravidla a hraj poctivě',
			description: 'Serverová pravidla jsou závazná. Obcházení trestů je zakázáno. Zabíjet hráče můžeš pouze s jeho souhlasem.',
		},
		{
			icon: '👮',
			title: 'Respektuj pokyny Admin Týmu',
			description: 'Pokyny Admin Týmu jsou důležité pro udržení pořádku na serveru.',
		},
		{
			icon: '🏭',
			title: 'Minimalizuj zátěž serveru',
			description: 'Tvé farmy a továrny by neměly zpomalovat server. Po varování může být nadměrně zatěžující obsah odstraněn.',
		},
		{
			icon: '💵',
			title: 'Dodržuj serverový CENÍK',
			description:
				'Neprodávej slimefun a enchant itemy pod minimální cenou dle serverového <a href="https://ananaso-manie.cz/cenik.html">CENÍKU</a>.',
		},
		{
			icon: '🔍',
			title: 'Nahlaš porušení pravidel',
			description:
				'Hráči jsou povinni hlásit porušení pravidel Admin Týmu, čímž přispívají k férovému a příjemnému hernímu prostředí pro všechny.',
		},
		{
			icon: '🛠️',
			title: 'Server je poskytován „jak je"',
			description: 'Admin Tým pomáhá dobrovolně. Podpora je bonus, ne nárok.',
		},
		{
			icon: '📜',
			title: 'Neznalost pravidel neomlouvá',
			description: 'Připojením se k serveru souhlasíš s pravidly, která platí pro všechny hráče bez výjimky.',
		},
	]
</script>

<template>
	<section class="min-h-screen px-4 sm:px-6 lg:px-8 py-32">
		<div class="max-w-7xl mx-auto">
			<header class="text-center mb-12">
				<h1 class="text-5xl md:text-6xl font-bold text-primary mb-4">Pravidla serveru</h1>
				<p class="text-xl md:text-2xl text-gray-300">Dodržuj pravidla a budeme kamarádi</p>
				<p class="text-gray-400 mt-2">Admin-Team si vyhrazuje kdykoliv pravidla změnit</p>
			</header>
			<div class="grid gap-8">
				<div
					v-for="(rule, index) in rules"
					:key="index"
					v-motion
					:initial="{ opacity: 0, y: 20 }"
					:visible-once="{
						opacity: 1,
						y: 0,
						transition: {
							delay: index * 10,
							duration: 500,
						},
					}"
					class="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors">
					<div class="flex gap-4">
						<span class="text-4xl">{{ rule.icon }}</span>
						<div>
							<h3 class="text-xl font-bold mb-2">{{ rule.title }}</h3>
							<p class="text-gray-300" v-html="rule.description"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
