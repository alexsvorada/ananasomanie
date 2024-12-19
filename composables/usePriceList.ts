import { ref, computed } from 'vue'
import priceListData from '@/data/pricelist.json'

interface Item {
	name: string
	amount: number
	price: number
}

interface Category {
	name: string
	items: Item[]
}

type PriceList = Record<string, Category>

const removeDiacritics = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}

export const usePriceList = () => {
	const priceList = ref<PriceList>(priceListData)
	const selectedCategory = ref<string | null>(null)
	const modifiedAmounts = ref<Record<string, number>>({})
	const searchQuery = ref('')

	const getCategoryDisplayName = (key: string) => {
		return priceList.value[key]?.name || key
	}

	const categories = computed(() => Object.keys(priceList.value))

	const getFilteredItems = (category: string) => {
		const items = priceList.value[category]?.items || []
		if (!searchQuery.value) return items

		const normalizedSearch = removeDiacritics(searchQuery.value)
		return items.filter((item) => removeDiacritics(item.name).includes(normalizedSearch))
	}

	const filteredCategories = computed(() => {
		if (!searchQuery.value) return categories.value

		const normalizedSearch = removeDiacritics(searchQuery.value)

		return categories.value.filter((category) => {
			const normalizedCategory = removeDiacritics(getCategoryDisplayName(category))
			const categoryMatches = normalizedCategory.includes(normalizedSearch)

			const hasMatchingItems = getFilteredItems(category).length > 0

			return categoryMatches || hasMatchingItems
		})
	})

	const hasItems = (category: string) => getFilteredItems(category).length > 0

	const isAmountModified = (itemName: string) => {
		return modifiedAmounts.value[itemName] !== undefined
	}

	const calculateTotalPrice = (item: Item, modifiedAmount: number) => {
		return item.price * modifiedAmount
	}

	const updateAmount = (itemName: string, item: Item, value: string) => {
		const newAmount = parseInt(value) || 1

		if (newAmount === item.amount) {
			delete modifiedAmounts.value[itemName]
		} else if (newAmount > 0) {
			modifiedAmounts.value[itemName] = newAmount
		}
	}

	const setActiveCategory = (category: string) => {
		selectedCategory.value = category
	}

	const isActiveCategory = (category: string) => {
		return selectedCategory.value === category
	}

	const getCategoryItems = (category: string) => {
		return getFilteredItems(category)
	}

	const getMatchingItemsCount = (category: string) => {
		if (!searchQuery.value) return 0
		return getFilteredItems(category).length
	}

	const isItemMatching = (itemName: string) => {
		if (!searchQuery.value) return false
		return removeDiacritics(itemName).includes(removeDiacritics(searchQuery.value))
	}

	return {
		priceList,
		selectedCategory,
		modifiedAmounts,
		categories,
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
	}
}
