import { ref } from 'vue'

interface TabOptions {
	defaultTab?: string
	onTabChange?: (tab: string) => void
}

export const useTabs = (options: TabOptions = {}) => {
	const selectedTab = ref<string>(options.defaultTab || '')
	const openSections = ref<string[]>([])

	const setActiveTab = (tab: string) => {
		selectedTab.value = tab
		openSections.value = []
		options.onTabChange?.(tab)
	}

	const isTabActive = (tab: string) => selectedTab.value === tab

	const toggleSection = (title: string) => {
		const index = openSections.value.indexOf(title)
		if (index === -1) {
			openSections.value.push(title)
		} else {
			openSections.value.splice(index, 1)
		}
	}

	const isSectionOpen = (title: string) => openSections.value.includes(title)

	return {
		selectedTab,
		openSections,
		setActiveTab,
		isTabActive,
		toggleSection,
		isSectionOpen,
	}
}
