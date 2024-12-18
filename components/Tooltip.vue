<script setup lang="ts">
	defineProps<{
		text: string
	}>()
</script>

<template>
	<div class="absolute -top-14 left-1/2 -translate-x-1/2">
		<div class="relative flex items-center justify-center px-4 py-2 rounded-lg border border-primary text-primary bg-dark">
			<span class="text-sm font-medium whitespace-nowrap">{{ text }}</span>
			<!-- Arrow -->
			<div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-dark rotate-45 border-b border-r border-primary"></div>
		</div>
	</div>
</template>
