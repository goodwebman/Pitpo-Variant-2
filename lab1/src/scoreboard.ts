type Participant = {
	solved: number
	penalty: number
	attempts: Record<number, number>
}

export function solveScoreboard(input: string): string {
	const lines = input.trim().split('\n')
	const blocks = parseInt(lines[0].trim())
	const results: string[] = []
	let lineIndex = 1

	for (let b = 0; b < blocks; b++) {
		const participants: Record<number, Participant> = {}

		while (lineIndex < lines.length && lines[lineIndex].trim() === '')
			lineIndex++
		while (lineIndex < lines.length && lines[lineIndex].trim() !== '') {
			const [u, p, t, s] = lines[lineIndex].trim().split(/\s+/)
			const user = parseInt(u),
				problem = parseInt(p),
				time = parseInt(t),
				status = s
			if (!participants[user])
				participants[user] = { solved: 0, penalty: 0, attempts: {} }
			const participant = participants[user]
			if (!participant.attempts[problem]) participant.attempts[problem] = 0

			if (status === 'C') {
				participant.solved++
				participant.penalty += time + participant.attempts[problem] * 20
			} else if (status === 'I') {
				participant.attempts[problem]++
			}
			lineIndex++
		}

		const sorted = Object.entries(participants)
			.map(([id, data]) => ({ id: parseInt(id), ...data }))
			.sort(
				(a, b) => b.solved - a.solved || a.penalty - b.penalty || a.id - b.id,
			)

		for (const p of sorted) {
			results.push(`${p.id} ${p.solved} ${p.penalty}`)
		}
		if (b < blocks - 1) results.push('')
	}

	return results.join('\n')
}
