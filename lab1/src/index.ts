import { solveMinesweeper } from './minesweeper'
import { solveScoreboard } from './scoreboard'

const minesweeperInput = `
4 4
*...
....
.*..
....
0 0
`

console.log('--- Minesweeper ---')
console.log(solveMinesweeper(minesweeperInput))

const scoreboardInput = `
1

1 2 10 I
3 1 11 C
1 2 19 R
1 2 21 C
1 1 25 C
`

console.log('--- Scoreboard ---')
console.log(solveScoreboard(scoreboardInput))
