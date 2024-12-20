import { ref } from 'vue'

export interface Voter {
	nickname: string
	votes: number
}

export interface VotingSite {
	name: string
	votes: Ref<string>
	topVoters: Ref<Voter[]>
	voteFunction: () => void
}

export const useVote = () => {
	const nickname = ref<string>('')
	const isLoading = ref(false)

	const voteOnMinecraftServery = () => {
		if (!nickname.value) return
		window.open(`https://minecraftservery.eu/server/116/vote/${nickname.value}`, '_blank')
	}

	const voteOnCraftList = () => {
		if (!nickname.value) return
		window.open(`https://craftlist.org/ananaso-manie?nickname=${nickname.value}`, '_blank')
	}

	const votingSites: VotingSite[] = [
		{
			name: 'MinecraftServery.eu',
			votes: ref('??'),
			topVoters: ref<Voter[]>([]),
			voteFunction: () => voteOnMinecraftServery(),
		},
		{
			name: 'Craftlist.org',
			votes: ref('??'),
			topVoters: ref<Voter[]>([]),
			voteFunction: () => voteOnCraftList(),
		},
	]

	const fetchVoteData = async () => {
		isLoading.value = true
		try {
			const [craftListResponse, minecraftServeryResponse] = await Promise.all([
				useFetch('/api/vote/craft-list'),
				useFetch('/api/vote/minecraft-servery'),
			])

			const craftListSite = votingSites.find((site) => site.name === 'Craftlist.org')
			if (craftListSite && craftListResponse.data.value) {
				craftListSite.votes.value = craftListResponse.data.value.reduce((sum, voter) => sum + voter.votes, 0).toString()
				craftListSite.topVoters.value = craftListResponse.data.value
			}

			const mcServerySite = votingSites.find((site) => site.name === 'MinecraftServery.eu')
			if (mcServerySite && minecraftServeryResponse.data.value) {
				mcServerySite.votes.value = minecraftServeryResponse.data.value.reduce((sum, voter) => sum + voter.votes, 0).toString()
				mcServerySite.topVoters.value = minecraftServeryResponse.data.value
			}
		} catch (error) {
			console.error('Error fetching vote data:', error)
		} finally {
			isLoading.value = false
		}
	}

	return {
		nickname,
		isLoading,
		votingSites,
		fetchVoteData,
	}
}
