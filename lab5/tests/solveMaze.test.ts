import { solveMaze } from '../src/solveMaze'

describe('solveMaze safe tests', () => {

	it('returns string', () => {
		const input = `1 1
/
0 0`

		expect(typeof solveMaze(input)).toBe('string')
	})

	it('contains Maze #1', () => {
		const input = `1 1
/
0 0`

		expect(solveMaze(input)).toContain('Maze #1:')
	})

	it('handles empty cycles message or cycles', () => {
		const input = `1 1
/
0 0`

		const res = solveMaze(input)

		expect(
			res.includes('There are no cycles.') ||
			res.includes('Cycles')
		).toBe(true)
	})

	it('does not crash on sample input', () => {
		const input = `2 2
//
//
0 0`

		expect(() => solveMaze(input)).not.toThrow()
	})

	it('handles multiple mazes', () => {
		const input = `1 1
/
1 1
/
0 0`

		const res = solveMaze(input)

		expect(res.split('Maze #').length).toBe(3)
	})

	it('returns non-empty string', () => {
		const input = `1 1
/
0 0`

		expect(solveMaze(input).length).toBeGreaterThan(0)
	})

	it('ends with newline', () => {
		const input = `1 1
/
0 0`

		expect(solveMaze(input).endsWith('\n')).toBe(true)
	})

	it('contains case numbering', () => {
		const input = `1 1
/
0 0`

		expect(solveMaze(input)).toMatch(/Maze #\d+:/)
	})

	it('handles minimal zero case', () => {
		const input = `0 0`

		expect(solveMaze(input)).toBe('')
	})

	it('stable execution large-ish input', () => {
		const input = `3 3
///
/\\/
/\\/
0 0`

		expect(() => solveMaze(input)).not.toThrow()
	})
})