<script setup lang="ts">
	interface TeamMember {
		name: string
		role: string
		image: string
	}

	const administrators: TeamMember[] = [
		{
			name: '100petr',
			role: 'Majitel',
			image: 'https://visage.surgeplay.com/bust/5813942fe6424906a22bdde91c7c75f9.png',
		},
		{
			name: 'Its_Stunik',
			role: 'Admin',
			image: 'https://visage.surgeplay.com/bust/2c9ecc4c930446cca4592067ba67d3a2.png',
		},
		{
			name: 'Insperful',
			role: 'Discord Správce',
			image: 'https://visage.surgeplay.com/bust/6c4aaf0cecce4febba62cf14e7fef16e.png',
		},
		{
			name: 'DionysiusCasparu',
			role: 'Helper',
			image: 'https://visage.surgeplay.com/bust/55cc9afe8e7e46839fe3a3d474e1384d.png',
		},
		{
			name: 'Ciment35KG',
			role: 'Helper',
			image: 'https://visage.surgeplay.com/bust/cd795446a60d4ea5aa10e771af4069cd.png',
		},
	]

	const eventers: TeamMember[] = [
		{
			name: 'Ivett',
			role: 'Eventerka',
			image: 'https://visage.surgeplay.com/bust/f56b1b6eb49f44eeafff3911dc966bb5.png',
		},
		{
			name: 'krisrys',
			role: 'Eventerka',
			image: 'https://visage.surgeplay.com/bust/49ab66525c0044d3a583e57e321de101.png',
		},
	]
</script>

<template>
	<section class="min-h-screen px-4 py-32 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<!-- Header -->
			<header class="mb-12 text-center">
				<h1 class="mb-4 text-5xl font-bold text-primary md:text-6xl">Admin-Team</h1>
				<p class="text-xl text-gray-300 md:text-2xl">Seznamte se s našim týmem</p>
			</header>

			<!-- Administrators Section -->
			<div
				class="mb-16"
				v-motion
				:initial="{ opacity: 0, y: 20 }"
				:visible-once="{
					opacity: 1,
					y: 0,
					transition: { duration: 500 },
				}">
				<h2 class="mb-8 text-3xl font-bold text-center">👑 Administrátoři</h2>
				<div class="grid gap-8 place-items-center">
					<div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 place-items-center">
						<div
							v-for="(admin, index) in administrators"
							:key="admin.name"
							v-motion
							:initial="{ opacity: 0, y: 20 }"
							:visible-once="{
								opacity: 1,
								y: 0,
								transition: {
									delay: index * 100,
									duration: 500,
								},
							}"
							class="flex flex-col items-center p-6 transition-transform rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm hover:scale-105">
							<img :src="admin.image" :alt="admin.name" class="w-32 h-32 mb-4 rounded-lg" loading="lazy" />
							<p class="mb-2 text-lg font-bold text-primary">{{ admin.role }}</p>
							<p class="text-gray-300">{{ admin.name }}</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Eventers Section -->
			<div
				v-motion
				:initial="{ opacity: 0, y: 20 }"
				:visible-once="{
					opacity: 1,
					y: 0,
					transition: {
						delay: 200,
						duration: 500,
					},
				}">
				<h2 class="mb-8 text-3xl font-bold text-center">🎮 Eventerky</h2>
				<div class="grid gap-8 place-items-center">
					<div class="grid gap-8 sm:grid-cols-2 place-items-center">
						<div
							v-for="(eventer, index) in eventers"
							:key="eventer.name"
							v-motion
							:initial="{ opacity: 0, y: 20 }"
							:visible-once="{
								opacity: 1,
								y: 0,
								transition: {
									delay: index * 100 + 300,
									duration: 500,
								},
							}"
							class="flex flex-col items-center p-6 transition-transform rounded-xl border border-white/10 bg-dark/50 backdrop-blur-sm hover:scale-105">
							<img :src="eventer.image" :alt="eventer.name" class="w-32 h-32 mb-4 rounded-lg" loading="lazy" />
							<p class="mb-2 text-lg font-bold text-primary">{{ eventer.role }}</p>
							<p class="text-gray-300">{{ eventer.name }}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
