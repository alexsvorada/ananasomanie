export const useCopy = () => {
	const copied = ref(false)

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text)
			copied.value = true
			setTimeout(() => {
				copied.value = false
			}, 3000)
		} catch (err) {
			copied.value = false
			console.error('Failed to copy text:', err)
		}
	}

	return {
		copied,
		copyToClipboard,
	}
}
