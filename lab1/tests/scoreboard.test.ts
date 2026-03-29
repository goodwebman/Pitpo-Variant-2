import { solveScoreboard } from '../src/scoreboard'

test('Scoreboard basic', () => {
	const input = `
1

1 2 10 I
3 1 11 C
1 2 19 R
1 2 21 C
1 1 25 C
`
	const output = `1 2 66
3 1 11`
	expect(solveScoreboard(input)).toBe(output)
})
