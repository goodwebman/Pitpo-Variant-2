import { solveMinesweeper } from '../src/minesweeper';

test('Minesweeper basic', () => {
  const input = `
4 4
*...
....
.*..
....
0 0
`;
  const output = `Field #1:
*100
2210
1*10
1110`;
  expect(solveMinesweeper(input)).toBe(output);
});

test('Minesweeper 3x3 single mine', () => {
  const input = `
3 3
...
.*.
...
0 0
`;
  const output = `Field #1:
111
1*1
111`;
  expect(solveMinesweeper(input)).toBe(output);
});