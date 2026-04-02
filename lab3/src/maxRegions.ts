export function maxRegionsBatch(s: number, ...values: number[]): string[] {
	const result: string[] = []

	for (let i = 0; i < s; i++) {
		const n = values[i]
		const N = BigInt(n)

		let regions: bigint

		if (n < 2) {
			regions = 1n
		} else {
			const c2 = (N * (N - 1n)) / 2n
			const c4 = n >= 4 ? (N * (N - 1n) * (N - 2n) * (N - 3n)) / 24n : 0n

			regions = 1n + c2 + c4
		}

		result.push(regions.toString())
	}

	return result
}

console.log(maxRegionsBatch(4, 1, 2, 3, 4))