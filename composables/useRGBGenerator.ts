export const useRGBGenerator = () => {
	const colors = ref(['#ffffff'])
	const text = ref('')
	const isBold = ref(false)
	const isItalic = ref(false)
	const isUnderline = ref(false)

	const MAX_COLORS = 4

	// Color utility functions
	const hexToRGB = (hex: string) => {
		const [r, g, b] = hex
			.slice(1)
			.match(/.{2}/g)!
			.map((x) => parseInt(x, 16))
		return { r, g, b }
	}

	const RGBToHex = (r: number, g: number, b: number) =>
		'#' + [r, g, b].map((x) => Math.round(x).toString(16).padStart(2, '0')).join('')

	// Color management
	const addColor = () => {
		if (colors.value.length < MAX_COLORS) {
			colors.value.push('#ffffff')
		}
	}

	const removeColor = (index: number) => {
		if (colors.value.length > 1) {
			colors.value.splice(index, 1)
		}
	}

	// Gradient calculation
	const getColorAtPosition = (position: number) => {
		if (colors.value.length === 1) return colors.value[0]

		const segments = colors.value.length - 1
		const segmentLength = 1 / segments
		const segment = Math.min(Math.floor(position / segmentLength), segments - 1)
		const segmentPosition = (position - segment * segmentLength) / segmentLength

		const { r: r1, g: g1, b: b1 } = hexToRGB(colors.value[segment])
		const { r: r2, g: g2, b: b2 } = hexToRGB(colors.value[segment + 1])

		return RGBToHex(r1 + (r2 - r1) * segmentPosition, g1 + (g2 - g1) * segmentPosition, b1 + (b2 - b1) * segmentPosition)
	}

	// Format helpers
	const getFormatPrefix = () => {
		return [isBold.value && '&l', isItalic.value && '&o', isUnderline.value && '&n'].filter(Boolean).join('')
	}

	const getColoredChar = (char: string, color: string) => `&#${color.substring(1)}${char}`

	// Main functionality
	const generatedCode = computed(() => {
		if (!text.value) return ''

		const prefix = getFormatPrefix()
		const textLength = text.value.length

		if (colors.value.length === 1) {
			return (
				prefix +
				text.value
					.split('')
					.map((char) => getColoredChar(char, colors.value[0]))
					.join('')
			)
		}

		return (
			prefix +
			text.value
				.split('')
				.map((char, i) => {
					const position = textLength > 1 ? i / (textLength - 1) : 0
					return getColoredChar(char, getColorAtPosition(position))
				})
				.join('')
		)
	})

	const getPreviewColor = (index: number) => {
		if (colors.value.length === 1) return colors.value[0]
		const position = text.value.length > 1 ? index / (text.value.length - 1) : 0
		return getColorAtPosition(position)
	}

	return {
		colors,
		text,
		isBold,
		isItalic,
		isUnderline,
		generatedCode,
		addColor,
		removeColor,
		getPreviewColor,
	}
}
