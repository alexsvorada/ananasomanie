import { ref, computed } from 'vue'
import priceListData from '@/data/pricelist.json'

interface Item {
	name: string
	amount: number
	price: number
}

const removeDiacritics = (str: string) => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}

const categoryNames: Record<string, string> = {
	enchanty: 'Enchanty',
	zbrane: 'Zbraně',
	uzitecnePredmety: 'Užitečné předměty',
	zakladniStroje: 'Základní stroje',
	nastroje: 'Nástroje',
	materialy: 'Materiály',
	extraGear: 'ExtraGear',
	jidlo: 'Jídlo',
	magickePredmety: 'Magické předměty',
	magickaZbroj: 'Magická zbroj',
	technickeKomponenty: 'Technické komponenty',
	smisenePredmety: 'Smíšené předměty',
	brneni: 'Brnění',
	talismanyTier1: 'Talismany (Tier I)',
	magickePomucky: 'Magické pomůcky',
	dankTech2: 'DankTech2',
	magicalPlants: 'Magical Plants',
	technickePomucky: 'Technické pomůcky',
	enderitoveTalismanyTier2: 'Enderitové talismany (Tier II)',
	soulJars: 'Soul Jars',
	extraTools: 'Extra Tools',
	galactifun: 'Galactifun',
	globalWarming: 'Global Warming',
	mobCapturer: 'Mob Capturer',
	transcEndence: 'TranscEndence',
	luckyBlocks: 'Lucky Blocks',
	foxyMachines: 'Foxy Machines',
	slimyTreeTaps: 'Slimy TreeTaps',
	fluffyMachines: 'Fluffy Machines',
	soundMuffler: 'SoundMuffler',
	liteXpansion: 'LiteXpansion',
	infinityExpansion: 'Infinity Expansion',
	dynaTech: 'DynaTech',
	energieElektrika: 'Energie a elektrika',
	gpsStroje: 'GPS Stroje',
	programovatelneAndoidy: 'Programovatelné andoidy',
	cargoSystem: 'Cargo System',
	ecoPowerGenerators: 'Eco-Power Generators',
}

export const usePriceList = () => {
	const priceList = ref<Record<string, Item[]>>(priceListData)
	const selectedCategory = ref<string | null>(null)
	const modifiedAmounts = ref<Record<string, number>>({})
	const searchQuery = ref('')

	const getCategoryDisplayName = (key: string) => categoryNames[key] || key

	const categories = computed(() => Object.keys(priceList.value))

	const getFilteredItems = (category: string) => {
		const items = priceList.value[category] || []
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

	const calculateTotalPrice = (item: { price: number; amount: number }, modifiedAmount: number) => {
		return item.price * modifiedAmount
	}

	const updateAmount = (itemName: string, item: { amount: number }, value: string) => {
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
