interface CraftListVoter {
	nickname: string
	score: number
	ip: string
	timestamp: number
}

export default defineCachedEventHandler(
	async (event) => {
		const config = useRuntimeConfig()

		const date = new Date()
		const year = date.getFullYear()
		const month = date.getMonth() + 1

		try {
			const response = await event.$fetch<CraftListVoter[]>(
				`https://api.craftlist.org/v1/${config.craftlistToken}/votes/${year}/${month}`
			)

			const voterMap = new Map<string, number>()

			response.forEach((vote) => {
				const currentVotes = voterMap.get(vote.nickname) || 0
				voterMap.set(vote.nickname, currentVotes + 1)
			})

			return Array.from(voterMap.entries())
				.map(([nickname, votes]) => ({ nickname, votes }))
				.sort((a, b) => b.votes - a.votes)
				.slice(0, 5)
		} catch (error) {
			console.error('Error fetching Craftlist votes:', error)
			throw createError({
				statusCode: 500,
				message: 'Failed to fetch voting data',
			})
		}
	},
	{
		maxAge: 1800,
		name: 'craft-list-votes',
		swr: true,
		group: 'votes',
	}
)
