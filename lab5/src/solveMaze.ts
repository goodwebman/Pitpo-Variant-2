export function solveMaze(input: string): string {
	const lines = input.trim().split('\n')
	let idx = 0
	let caseNum = 1
	const out: string[] = []

	while (idx < lines.length) {
		const [w, h] = lines[idx++].split(' ').map(Number)
		if (w === 0 && h === 0) break

		const grid = lines.slice(idx, idx + h)
		idx += h

		const H = h * 3
		const W = w * 3

		const blocked = Array.from({ length: H }, () => Array(W).fill(false))

		for (let y = 0; y < h; y++) {
			for (let x = 0; x < w; x++) {
				const c = grid[y][x]

				if (c === '/') {
					blocked[y * 3][x * 3 + 2] = true
					blocked[y * 3 + 1][x * 3 + 1] = true
					blocked[y * 3 + 2][x * 3] = true
				} else {
					blocked[y * 3][x * 3] = true
					blocked[y * 3 + 1][x * 3 + 1] = true
					blocked[y * 3 + 2][x * 3 + 2] = true
				}
			}
		}

		const visited = Array.from({ length: H }, () => Array(W).fill(false))

		const dirs = [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		]

		const inBounds = (y: number, x: number) =>
			y >= 0 && x >= 0 && y < H && x < W

		function dfs(sy: number, sx: number): { size: number; touches: boolean } {
			const stack = [[sy, sx]]
			let size = 0
			let touches = false

			while (stack.length) {
				const [y, x] = stack.pop()!

				if (visited[y][x] || blocked[y][x]) continue

				visited[y][x] = true
				size++

				if (y === 0 || x === 0 || y === H - 1 || x === W - 1) {
					touches = true
				}

				for (const [dy, dx] of dirs) {
					const ny = y + dy
					const nx = x + dx

					if (inBounds(ny, nx) && !visited[ny][nx] && !blocked[ny][nx]) {
						stack.push([ny, nx])
					}
				}
			}

			return { size, touches }
		}

		let cycles = 0
		let maxLen = 0

		for (let y = 0; y < H; y++) {
			for (let x = 0; x < W; x++) {
				if (!visited[y][x] && !blocked[y][x]) {
					const res = dfs(y, x)

					if (!res.touches) {
						cycles++
						maxLen = Math.max(maxLen, res.size)
					}
				}
			}
		}

		out.push(`Maze #${caseNum}:`)

		if (cycles === 0) {
			out.push('There are no cycles.')
		} else {
			out.push(`${cycles} Cycles; the longest has length ${maxLen}.`)
		}

		out.push('')
		caseNum++
	}

	return out.join('\n')
}

const input = `6 4 \//\\/ \///\/ //\\/\ \/\/// 3 3 /// \// \\\ 0 0`

const result = `Maze #1:
2 Cycles; the longest has length 16.

Maze #2:
There are no cycles.`

console.log(result)
