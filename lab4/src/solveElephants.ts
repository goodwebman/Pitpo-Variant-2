type Elephant = {
	weight: number
	iq: number
	index: number
}

export function solveElephants(input: string): string {
	const lines = input.trim().split('\n')

	const elephants: Elephant[] = lines.map((line, i) => {
		const [w, iq] = line.trim().split(/\s+/).map(Number)
		return { weight: w, iq, index: i + 1 }
	})


	elephants.sort((a, b) => {
		if (a.weight !== b.weight) return a.weight - b.weight
		return a.iq - b.iq
	})

	const n = elephants.length
	const dp = Array(n).fill(1)
	const prev = Array(n).fill(-1)

	for (let i = 0; i < n; i++) {
		for (let j = 0; j < i; j++) {
			if (
				elephants[j].weight < elephants[i].weight &&
				elephants[j].iq > elephants[i].iq &&
				dp[j] + 1 > dp[i]
			) {
				dp[i] = dp[j] + 1
				prev[i] = j
			}
		}
	}

	let maxLen = 0
	let lastIndex = 0

	for (let i = 0; i < n; i++) {
		if (
			dp[i] > maxLen ||
			(dp[i] === maxLen && elephants[i].weight > elephants[lastIndex].weight)
		) {
			maxLen = dp[i]
			lastIndex = i
		}
	}

	const sequence: number[] = []

	while (lastIndex !== -1) {
		sequence.push(elephants[lastIndex].index)
		lastIndex = prev[lastIndex]
	}

	sequence.reverse()

	return [maxLen, ...sequence].join('\n')
}

// тест
const input = `6008 1300
6000 2100
500 2000
1000 4000
1100 3000
6000 2000
8000 1400
6000 1200
2000 1900`

const result = solveElephants(input)
console.log(result)
