<script setup lang="ts">
	defineProps<{
		text: string
	}>()
</script>

<template>
	<div class="absolute -top-14 left-1/2 -translate-x-1/2 z-50">
		<div class="relative flex items-center justify-center px-4 py-2 bg-dark/50 backdrop-blur-sm rounded-lg shadow-xl">
			<span class="text-light text-sm font-medium whitespace-nowrap">{{ text }}</span>
			<!-- Semi-transparent background to match CTA -->
			<div class="absolute inset-0 rounded-lg bg-dark/50 backdrop-blur-sm -z-10"></div>
			<!-- Subtle border -->
			<div class="absolute inset-0 rounded-lg border border-white/10 -z-20"></div>
			<!-- Arrow -->
			<div
				class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark/50 backdrop-blur-sm rotate-45 border-b border-r border-white/10"></div>
		</div>
	</div>
</template>
