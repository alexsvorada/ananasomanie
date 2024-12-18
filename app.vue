<script setup lang="ts">
	useHead(useMetadata())
</script>

<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>

<style>
	:root {
		--primary: #ffb23f;
		--dark: #1a1a1a;
		--light: #f5f5f5;
		--accent: #ff6b6b;
	}

	body {
		font-family: 'Figtree', sans-serif;
	}

	.page-enter-active,
	.page-leave-active {
		transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.page-enter-from {
		opacity: 0;
		transform: translateY(10px);
		filter: blur(4px);
	}

	.page-leave-to {
		opacity: 0;
		transform: translateY(-10px);
		filter: blur(4px);
	}

	.page-enter-active,
	.page-leave-active {
		will-change: opacity, transform;
		backface-visibility: hidden;
		perspective: 1000px;
	}
</style>
