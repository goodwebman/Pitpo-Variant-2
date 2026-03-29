export function reconstructFiles(input: string): string {
	const lines = input
		.trim()
		.split('\n')
		.map(l => l.trim())
	const blocksCount = parseInt(lines[0])
	let lineIndex = 1
	const results: string[] = []

	for (let b = 0; b < blocksCount; b++) {
		while (lines[lineIndex] === '') lineIndex++

		const fragments: string[] = []
		while (lineIndex < lines.length && lines[lineIndex] !== '') {
			fragments.push(lines[lineIndex])
			lineIndex++
		}

		const n = fragments.length / 2
		const used = Array(fragments.length).fill(false)
		const merged: string[] = []

		for (let i = 0; i < fragments.length; i++) {
			if (used[i]) continue
			let bestJ = -1
			let bestOverlap = -1

			for (let j = 0; j < fragments.length; j++) {
				if (i === j || used[j]) continue
				const a = fragments[i],
					b = fragments[j]

				let overlap = 0
				const maxCheck = Math.min(a.length, b.length)
				for (let k = maxCheck; k >= 1; k--) {
					if (a.slice(-k) === b.slice(0, k)) {
						overlap = k
						break
					}
				}
				if (overlap > bestOverlap) {
					bestOverlap = overlap
					bestJ = j
				}
			}

			if (bestJ >= 0) {
				const a = fragments[i],
					b = fragments[bestJ]
				merged.push(a + b.slice(bestOverlap))
				used[i] = used[bestJ] = true
			} else {
				merged.push(fragments[i])
				used[i] = true
			}
		}

		results.push(merged[0] ?? '')
		lineIndex++
	}

	return results.join('\n\n')
}
