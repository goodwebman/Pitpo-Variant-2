export function solveMinesweeper(input: string): string {
	const lines = input.trim().split('\n');
	const results: string[] = [];
	let fieldNumber = 1;
	let i = 0;

	while (i < lines.length) {
		const [n, m] = lines[i].trim().split(/\s+/).map(Number);
		if (n === 0 && m === 0) break;

		const field: string[][] = [];
		for (let r = 0; r < n; r++) {
			i++;
			field.push(lines[i].split(''));
		}

		const outputField: string[][] = Array.from({ length: n }, () =>
			Array(m).fill('0')
		);

		const dirs = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1],           [0, 1],
			[1, -1], [1, 0], [1, 1],
		];

		for (let r = 0; r < n; r++) {
			for (let c = 0; c < m; c++) {
				if (field[r][c] === '*') {
					outputField[r][c] = '*';
					continue;
				}
				let count = 0;
				for (const [dr, dc] of dirs) {
					const nr = r + dr, nc = c + dc;
					if (nr >= 0 && nr < n && nc >= 0 && nc < m && field[nr][nc] === '*') {
						count++;
					}
				}
				outputField[r][c] = count.toString();
			}
		}

		results.push(`Field #${fieldNumber}:`);
		results.push(...outputField.map(row => row.join('')));

		fieldNumber++;
		i++;
		if (i < lines.length && !(lines[i].trim() === '0 0')) {
			results.push('');
		}
	}

	return results.join('\n');
}