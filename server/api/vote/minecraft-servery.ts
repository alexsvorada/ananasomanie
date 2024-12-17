interface MinecraftServeryVoter {
	nickname: string
	count: number
}

export default defineCachedEventHandler(
	async (event) => {
		const config = useRuntimeConfig()

		try {
			const response = await event.$fetch<MinecraftServeryVoter[]>(
				`https://minecraftservery.eu/api/v1/server/${config.minecraftServeryToken}/top-voters`
			)

			return response
				.map((voter) => ({
					nickname: voter.nickname,
					votes: voter.count,
				}))
				.sort((a, b) => b.votes - a.votes)
				.slice(0, 5)
		} catch (error) {
			console.error('Error fetching MinecraftServery votes:', error)
			throw createError({
				statusCode: 500,
				message: 'Failed to fetch voting data',
			})
		}
	},
	{
		maxAge: 300,
		name: 'minecraft-servery-votes',
		swr: true,
		group: 'votes',
	}
)
