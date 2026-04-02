export function multiplicationGame(n: number): string {
	let p = 1
	let isStanTurn = true

	while (p < n) {
		if (isStanTurn) {
			p *= 9
		} else {
			p *= 2
		}
		isStanTurn = !isStanTurn
	}

	return isStanTurn ? 'Ollie wins' : 'Stan wins'
}

console.log(multiplicationGame(162))
console.log(multiplicationGame(17))
console.log(multiplicationGame(34012226))
